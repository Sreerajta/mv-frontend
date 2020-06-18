import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { authenticationService } from '../services';
import { MovieBody } from '../components/movieList.js'
import './home.css';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        currentUser: authenticationService.currentUserValue,
        users: null,
        movies: {},
        votes:{},
        has_more: true,
        paging_state: 0,
        user_genres:authenticationService.currentUserValue.genre_combo
      };

      this.handleRefresh = this.handleRefresh.bind(this)
      this.getMovie = this.getMovie.bind(this)
      this.updateVote = this.updateVote.bind(this)
      this.getGenres = this.getGenres.bind(this)
      // this.sendUpvoteJob = this.sendUpvoteJob.bind(this)
    }

    componentDidMount() {
      // this.getGenres()
      this.getMovie()
    }


    handleRefresh() {
      return new Promise((resolve) => {
        this.getMovie(true)
      });
    }


    //////////TO SET STATE BEFORE UPDATE
    // updateVote(id){
    //   let votes_copy = this.state.votes
    //   votes_copy[id] = votes_copy[id] + 1
    //   this.setState({
    //     votes : votes_copy
      
    //   }
    // ,()=>{console.log(this.state.votes)})
    
    // }


    getGenres(){
      console.log(this.state.currentUser.genre_combo)
    }
    //SET STATE AFTER UPDATE JOB
    updateVote(id){
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      reqHeaders.append('Authorization', 'Bearer ' + this.state.currentUser['access_token']);
      let req_url = 'http://localhost:8000/upvoteMovie?movie_id=' + id



      fetch(req_url, {
        method: 'GET',
        headers: reqHeaders,
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(() => {
        let votes_copy = this.state.votes
        votes_copy[id] = votes_copy[id] + 1
        this.setState({
          votes : votes_copy
        
        })        

      })
      .catch(error => {
        console.log(error);
      });


    }

    

    getMovie(is_refresh = false) {
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      reqHeaders.append('Authorization', 'Bearer ' + this.state.currentUser['access_token']);

      let req_url = 'http://localhost:8000/test?paging_state=0&genre_filter='+this.state.user_genres

      // if (this.state.paging_state && this.state.paging_state.length > 0) {
      //   req_url = 'http://localhost:8000/getMovies?paging_state=' + encodeURIComponent(this.state.paging_state)
      // } else if (is_refresh) {
      //   return
      // }

      if (is_refresh) {
        req_url = 'http://localhost:8000/test?paging_state=' + this.state.paging_state +'&genre_filter='+this.state.user_genres
      } else if (is_refresh) {
        return
      }

      fetch(req_url, {
          method: 'GET',
          headers: reqHeaders,
        })
        .then(response => {
          if (response.ok) return response.json();
          throw new Error('Request failed.');
        })
        .then(data => {          
          let movies_data = data['movies'].sort(this.compare_votes) //TODO: RETURN OBJ INSTEAD OF LIST FROM API
          let movies_list = {}
          let votes_list = {}

          let movie_state_copy = this.state.movies

          movies_data.forEach(movie => {
            votes_list[movie.id] = movie.votes
            // if(!(movie_state_copy.hasOwnProperty(movie.id))){
                movie_state_copy[movie.id] = movie
            // }
            
          });

          this.setState({

            movies: movie_state_copy,
            votes:{...this.state.votes,...votes_list},
            has_more: data.has_more_pages,
            paging_state: data.paging_state

          });

          

          // this.setState({

          //   movies: [
          //     ...this.state.movies,
          //     ...movies_list

          //   ],
          //   votes:{...this.state.votes,...votes_list},
          //   has_more: data.has_more_pages,
          //   paging_state: data.paging_state

          // });

        })
        .catch(error => {
          console.log(error);
        });
    }

  compare_votes( a, b ) {
      if ( a.votes > b.votes ){
        return -1;
      }
      if ( a.votes < b.votes ){
        return 1;
      }
      return 0;
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

            {Object.values(this.state.movies).map((movie, index) => {
              let title = `${movie.title}`
              let  votes= `${this.state.votes[movie.id]}`
              let poster = movie.poster
              let description = movie.plot
              let id = movie.id
              let user_voted = movie.user_voted
              let updateVote = this.updateVote
              return(
                <MovieBody  className="movie-body"
                  key={id}
                  id ={id}
                  title={title}
                  votes={votes}
                  user_voted = {user_voted}
                  description={description}
                  poster={poster}
                  updateVote = {updateVote} />
              )
            })}
                  
            </div>

            </InfiniteScroll>       
            </div>




        );
    }
}

export { HomePage };