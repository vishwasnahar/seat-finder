import React from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      summary: '',
      genre: '',
      imdb: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleresponse = this.handleresponse.bind(this);
  }
  
  handleresponse(event) {
    let data = {title: this.state.title, year: this.state.year, summary: this.state.summary, genre: this.state.genre, imdb_link: this.state.imdb}
    axios.post(`/movies`, {'movie': data})
      .then(res => {
        console.log(res, 'Res')
        this.props.history.push('/')
      })
    event.preventDefault();
  }
  
  handleChange(event){
    event.preventDefault();
    let errors = this.state.errors;
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value})
  }

  render () {
    console.log(this.state)
    return (
      <>
        <form onSubmit={this.handleresponse}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
          </label>
          <label>
            Year:
            <input type="number" name="year" value={this.state.year} onChange={this.handleChange} required />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} required />
          </label>
          <label>
            IMDB:
            <input type="text" name="imdb" value={this.state.imdb} onChange={this.handleChange} required />
          </label>
          <label>
            Summary:
            <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange} required />
          </label>
          <input type="submit" value="Submit" />
          <button onClick={()=> this.props.history.push('/')}>Cancel</button>
        </form>
      </>
    );
  }
}

export default Home
