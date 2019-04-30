import React, { Component } from 'react'
import axios from 'axios'

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
      <h1>Dad Jokes</h1>
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