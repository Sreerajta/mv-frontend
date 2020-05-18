import React, { Component } from 'react';
import { MovieBody } from './components/movieList.js'
import InfiniteScroll from 'react-infinite-scroller';
// import {BrowserRouter} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      movies:
      [ 
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this)
    this.getMovie = this.getMovie.bind(this)
  }

  handleRefresh() {
    return new Promise((resolve) => {
      this.getMovie()
    });
  }

  componentDidMount() {
    this.getMovie()
  }

  getMovie() {
    fetch('https://randomuser.me/api/')   //dummy placeholder data for now
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      console.log(data);
      this.setState({
        
        movies:[
          ...this.state.movies,
          {
            title: data.results[0].name,
            poster: data.results[0].picture.medium,
            description: data.results[0].email,
          },
        
        ]
      });
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <InfiniteScroll
      pageStart={0} 
      loadMore={this.handleRefresh}
      hasMore={true}  // edit with has_more response from api
      loader={<div className="loader" key={0}>Loading ...</div>}>

      <div className="main-body">
        {[...this.state.movies].map((movie, index) => {
          let title = `${movie.title.first} ${movie.title.last}`
          let  rating= `0.0`
          let poster = movie.poster
          let description = movie.description
          return(
            <MovieBody 
              key={index}
              title={title}
              rating={rating}
              description={description}
              poster={poster} />
          )
        })}      
      </div>

      </InfiniteScroll>
    );
  }
}

export default App;