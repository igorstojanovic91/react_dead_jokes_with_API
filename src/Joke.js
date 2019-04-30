import React, { Component } from 'react'
import './Joke.css'
class Joke extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt) {

        this.props.voting(this.props.id, Number(evt.target.id))
    }


  render() {

    return (
      <div className="Joke">
        <div className="Joke-buttons">
        <i className="fas fa-arrow-up" id="1" onClick={this.handleClick}></i>
        <span className="Joke-votes">{this.props.votes}</span>
        <i className="fas fa-arrow-down" id="-1" onClick={this.handleClick} ></i>
        </div>
        <div className="Joke-text">
         {this.props.text}
        </div>
        <div className="Joke-smiley">
             <i className="em em-rolling_on_the_floor_laughing"></i>
        </div>
      </div>
    )
  }
}

export default Joke;
