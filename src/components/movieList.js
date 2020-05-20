import React from 'react';

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
    {props.rating}
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
              <MovieRating rating={props.rating}/>
            </div>
            <MovieDescription description={props.description}/>
          </div>
        </div>
      </MovieContainer>
    )
  }
  
  export { MovieBody }