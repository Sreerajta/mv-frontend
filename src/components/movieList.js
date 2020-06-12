import React from 'react';

// import {LikeButton} from LikeButton
import {LikeButton} from './LikeButton'


// const LikeButton = (props)=>{
//   return (
//     <div>
//           <button className="button">
//             <i className="far fa-heart fa-lg" style={{ color: "#33c3f0" }}></i>
//           </button>
//     </div>

//   )
// }

const MovieContainer = (props)=>{
  return(
  <div className ='movie-container' >
      {props.children}
  </div>)
}

const MoviePoster = (props)=>{
  return(
  <div className ='movie-poster' >
      <img src={props.poster} alt="Logo" className="picture">
     </img>
  </div>)
}

const MovieDescription = (props)=>{
  return(
  <div className ='movie-description' >
      {props.description}
  </div>)
}

const MovieGenres = (props)=>{
  return(
  <div className ='movie-genres' >

  </div>)
}

const MovieTitle = (props)=>{
  return(
  <div className ='movie-title' >
      {props.title}
  </div>)
}

const MovieRating = (props)=>{
  return(
  <div className ='movie-rating' >
    {props.rating} Likes
  </div>)
}

const MovieBody = (props) => {
    return(
      <MovieContainer className ='movie-container'>
        <div className="inner-body">
          <MoviePoster poster={props.poster}/>
          <div className="body">
            <div className="inner-body">
              <MovieTitle title={props.title}/>
              <MovieRating rating={props.votes}/>
             
              
            </div>
            <div className="inner-body">
            <MovieDescription description={props.description}/>
            <LikeButton key={'like-button'+props.id} id={props.id} user_voted={props.user_voted} updateVote={props.updateVote}></LikeButton>
            </div>
          </div>
        </div>
      </MovieContainer>
    )
  }
  
  export { MovieBody }