import React, { Component } from 'react'
import axios from 'axios'
import './JokeList.css'
import Joke from './Joke'
import uuid from 'uuid/v4'

const API_URL = "https://icanhazdadjoke.com/"
class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")//localStorage if not empty, else empty array
            //clear localStorage in Browser with: window.localStorage.clear()
        }
        this.handleVote = this.handleVote.bind(this)
        this.getJokes = this.getJokes.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
     componentDidMount() {
        //Load jokes
        if(this.state.jokes.length === 0) this.getJokes() 
        
    }
    async getJokes() {
        let jokes = []

        while (jokes.length < this.props.numJokesToGet) {
            let response = await axios.get(API_URL, 
            {headers: { Accept: "application/json"}}) // wants json version instead standard html version
            jokes.push({id: uuid(), joke: response.data.joke, votes: 0})
        }      

        this.setState(
            st => ({
                jokes: [...st.jokes, ...jokes]
            }),
            () =>
              window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
        console.log(JSON.stringify(this.state.jokes))
    }

    handleClick() {
        this.getJokes()
    }

    handleVote(id, delta) {
        //loops over jokes and comapres joke id to passed id and returns an object where it updates the vote value
        this.setState(st => ({
            jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta}: j)
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes) //is run after state is set
        ))
    }

  render() {
    return (
      <div className="JokeList">
      <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
        </h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="rofl-smiley" />
        <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
      </div>

        <div className="JokeList-jokes">
            {this.state.jokes.map(j => (
                <Joke votes={j.votes} text={j.joke} key={j.id} id={j.id} voting={this.handleVote} />
            ))}
            </div>
      </div>
    )
  }
}

export default JokeList;