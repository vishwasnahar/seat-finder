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
    axios.get(`/movies/`+this.props.location.state.id)
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
          <div>
            <h3>{this.state.response.title} ({this.state.response.year}, {this.state.response.genre})</h3>
            <p>{this.state.response.summary}</p>
          </div>
          <Seats />
        </div>
      </>
    );
  }
}

export default ShowMovie
