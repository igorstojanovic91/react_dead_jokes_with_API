import React, { Component } from 'react'
import axios from 'axios'
import './JokeList.css'
const API_URL = "https://icanhazdadjoke.com/"
class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)
        this.state = {
            jokes: [],

        }
    }
    async componentDidMount() {
        //Load jokes
        let jokes = []

        while (jokes.length < this.props.numJokesToGet) {
            let response = await axios.get(API_URL, 
            {headers: { Accept: "application/json"}}) // wants json version instead standard html version
            jokes.push(response.data.joke)
        }
        
        this.setState({jokes: jokes})
    
    }

  render() {
    return (
      <div className="JokeList">
      <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
        </h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        <button className="JokeList-getmore">New Jokes</button>
      </div>

        <div className="JokeList-jokes">
            {this.state.jokes.map(joke => (
                <div>{joke}</div>
            ))}
            </div>
      </div>
    )
  }
}

export default JokeList;