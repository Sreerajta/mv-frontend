import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { authenticationService } from '../services';
import { MovieBody } from '../components/movieList.js'
import './home.css';


import { authHeader, handleResponse } from '../helpers';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            movies: [],
            has_more: true,
            paging_state:null
        };

        this.handleRefresh = this.handleRefresh.bind(this)
        this.getMovie = this.getMovie.bind(this)
        this.getMovieFake = this.getMovieFake.bind(this)
    }

    componentDidMount() {
        // userService.getAll().then(users => this.setState({ users }));
        // this.getMovie()
        this.getMovieFake()
    }


  handleRefresh() {
    return new Promise((resolve) => {
      console.log('handle refresh')
      // this.getMovie(true)
    });
  }


    getMovieFake(){
      const requestOptions = { method: 'GET', headers: authHeader() };
      return fetch(`localhost:8000/getMovies`, requestOptions).then(response => {
      if(response.ok){
        return response.text().then(text => {
          const data = text && JSON.parse(text);
          return data
        })
      }
      
      throw new Error('Request failed.');
      }).then(data=>{
        console.log(data);
        const movies_list = data
        this.setState({
          
          movies:[
            ...this.state.movies,
            ...movies_list
          
          ],
          has_more:data.false,
          paging_state:''

        });
      }).catch(error => {
        console.log(error);
      });;
    }
    
    getMovie(is_refresh=false) {
         console.log('====',this.state.currentUser['access_token'])
        const reqHeaders = new Headers();
        reqHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        reqHeaders.append('Authorization', 'Bearer '+this.state.currentUser['access_token']);
        
        let req_url = 'http://localhost:8000/getMovies'
        
        if(this.state.paging_state && this.state.paging_state.length > 0){
          req_url = 'http://localhost:8000/getMovies'
        }
        else if(is_refresh){
          return
        }

        fetch(req_url,{
          method: 'GET',
          headers: reqHeaders,
      })  
        .then(response => {
          // if(response.ok) 
          return response
          // throw new Error('Request failed.');
        })
        .then(data => {
          console.log(data);
          const movies_list = data
          this.setState({
            
            movies:[
              ...this.state.movies,
              ...movies_list
            
            ],
            has_more:data.has_more_pages,
            paging_state:data.paging_state

          });
          
        })
        .catch(error => {
          console.log(error);
        });
      }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
             <InfiniteScroll pageStart={0} 
                             loadMore={this.handleRefresh}
                             hasMore={this.state.has_more}  // edit with has_more response from api
                             loader={<div className="loader" key={0}>Loading ...</div>}>

            <div className="main-body">
            {[...this.state.movies].map((movie, index) => {
              let title = `${movie.title}`
              let  rating= `${movie.rating}`
              let poster = movie.poster
              let description = movie.plot
              return(
                <MovieBody  className="movie-body"
                  key={index}
                  title={title}
                  rating={rating}
                  description={description}
                  poster={poster} />
              )
            })}      
            </div>

            </InfiniteScroll>          
                     
            
            </div>




        );
    }
}

export { HomePage };