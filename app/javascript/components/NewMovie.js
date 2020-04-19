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
        <button onClick={()=> this.props.history.push('/')}>Back</button>
        <form onSubmit={this.handleresponse}>
          <div style={formRow}>
            <label>
              <b>Title:</b>
            </label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
          </div>
          <div style={formRow}>
            <label>
              <b>Year:</b>
            </label>
            <input type="number" name="year" value={this.state.year} onChange={this.handleChange} required />
          </div>
          <div style={formRow}>
            <label>
              <b>Genre:</b>
            </label>
            <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} required />
          </div>
          <div style={formRow}>
            <label>
              <b>IMDB:</b>
            </label>
            <input type="text" name="imdb" value={this.state.imdb} onChange={this.handleChange} required />
          </div>
          <div style={formRow}>
            <label>
              <b>Summary:</b>
            </label>
            <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange} required />
          </div>
          <input type="submit" value="Add Movie" />
        </form>
      </>
    );
  }
}

const formfield = {
  width: '18%',
  float: 'left',
  paddingLeft: 10,
  paddingRight: 10
}
const formRow = {
  width: '100%',
  display: "inline-block",
  padding: 10
}


export default Home
