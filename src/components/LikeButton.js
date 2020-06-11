import React from 'react';
class LikeButton extends React.Component {
    constructor() {
      super();
      this.state = {
        liked: false
      };
      this.handleClick = this.handleClick.bind(this);
    } 
    
    handleClick() {
      this.setState({
        liked: !this.state.liked
      });
    }
    
    render() {
      const text = this.state.liked ? 'liked' : 'haven\'t liked';
      const label = this.state.liked ? 'Unlike' : 'Like'
      return (
        <div className="buttonContainer">
          <button className="btn-like" onClick={this.handleClick}>
            {label}</button>
          
        </div>
      );
    }
  }

  export{LikeButton}