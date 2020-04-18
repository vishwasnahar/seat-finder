import React from "react";
import PropTypes from 'prop-types'
import axios from 'axios';
import {Table} from 'react-bootstrap'
import { Link } from "react-router-dom"; 
import Seats from './Home'
class ShowMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    };
  }
  
  componentDidMount(){
    axios.get(`http://localhost:3000/movies/`+this.props.location.state.id)
      .then(res => {
        console.log(res, 'Res')
        this.setState({response: res.data.movie });
      })
  }

  render () {
    console.log(this.state)
    return (
      <>
        <button onClick={()=> this.props.history.push('/')}>Back</button>
        <div>
          <p>Movie: </p>
          <div>
            <ul>
              <li>
                <p>Title</p>
                <p>{this.state.response.title}</p>
              </li>
              <li>
                <p>Genre</p>
                <p>{this.state.response.genre}</p>
              </li>
              <li>
                <p>Year</p>
                <p>{this.state.response.year}</p>
              </li>
              <li>
                <p>Summary</p>
                <p>{this.state.response.summary}</p>
              </li>
            </ul>
          </div>
          <Seats />
        </div>
      </>
    );
  }
}

export default ShowMovie
