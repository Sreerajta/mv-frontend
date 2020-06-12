import React from 'react';
class LikeButton extends React.Component {
    constructor(props) {
      super();
      this.state = {
        liked: props.user_voted === 'false'? false : true
      };
      this.handleClick = this.handleClick.bind(this);
    } 
    
    handleClick(e) {
      // console.log(e.target.id)
      if(this.state.liked == false ){
      this.setState({
        liked: !this.state.liked
      });
      this.props.updateVote(e.target.id)
    }
    else{
      return
    }
    }

    do_upvote(movie_id)
    {
      
    }
    
    render() {
      const label = this.state.liked ? 'Unlike' : 'Like'
      return (
        <div className="buttonContainer">
          <button className="btn-like" id={this.props.id} onClick={this.handleClick} >
            {label}</button>
          
        </div>
      );
    }
  }

  export{LikeButton}