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
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"), //localStorage if not empty, else empty array
            //clear localStorage in Browser with: window.localStorage.clear()
            loading: false
        }

        this.handleVote = this.handleVote.bind(this)
        this.getJokes = this.getJokes.bind(this)
        this.handleClick = this.handleClick.bind(this)
        //new set of seen jokes
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke));
    }
     componentDidMount() {
        //Load jokes
        if(this.state.jokes.length === 0) this.getJokes() 
        
    }
    async getJokes() {
        let jokes = []
        try{ 
        while (jokes.length < this.props.numJokesToGet) {
            let response = await axios.get(API_URL, 
            {headers: { Accept: "application/json"}}) // wants json version instead standard html version
            let newJoke = response.data.joke
            if(!this.seenJokes.has(newJoke)) { //compares it to the set of values defined in constructor and if not included it is added to local storage
                jokes.push({id: uuid(), joke: newJoke, votes: 0})
            } else {
                console.log("found a duplicate")
                console.log(newJoke);
            }
        }      

        this.setState(
            st => ({
                loading: false, 
                jokes: [...st.jokes, ...jokes]
            }),
            () =>
              window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
        } catch (error) {
            alert(`Couldn't load data! ${error}`)
            this.setState({loading: false})

        }
    }

    handleClick() {
        this.setState({loading: true}, this.getJokes) //this.getJokes as callback when setState is finished
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
      if(this.state.loading) {
          return (
              <div className="JokeList-spinner">
                <i className="far fa-8x fa-laugh fa-spin"></i> {/* fa spin is a animation from font awesome*/}
                <h1 className="JokeList-title">Loading...</h1>
              </div>
          )
      }
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