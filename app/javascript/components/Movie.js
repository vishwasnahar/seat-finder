import React from "react";
import axios from 'axios';
import {Table, Button} from 'react-bootstrap'
import ShowMovie from './ShowMovie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleresponse = this.handleresponse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount(){
    axios.get(`http://localhost:3000/movies`)
      .then(res => {
        console.log(res, 'Res')
        this.setState({response: res.data.movies });
      })
  }


  handleresponse(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event, item){
    axios.delete(`http://localhost:3000/movies/`+item.id)
      .then(response => {
        axios.get(`http://localhost:3000/movies`)
        .then(res => {
          console.log(res, 'Res')
          this.setState({response: res.data.movies });
        })
      })
    event.preventDefault();
  }

  render () {
    console.log(this.state)
    return (
      <>
        <div>
          <p><Link to="/new" className="btn btn-primary">Add new Movie</Link></p>
        </div>
        <div>
          <p>Movies: </p>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan="2">#</th>
                <th colSpan="5">Title</th>
                <th colSpan="5">Year</th>
                <th colSpan="5">Genre</th>
                <th colSpan="8">IMDB</th>
              </tr>
            </thead>
            <tbody>
              {this.state.response.map( (item, i) => {
                return <tr key={i}>
                  <td colSpan="2">{item.id}</td>
                  <td colSpan="5">{item.title}</td>
                  <td colSpan="5">{item.year}</td>
                  <td colSpan="5">{item.genre}</td>  
                  <td colSpan="8"><Link to={item.imdb_link} className="btn btn-primary">Link</Link></td>
                  <td><Link to={{pathname: "./edit", state: {id: item.id}}} className="btn btn-primary">Edit</Link></td>
                  <a href="#" onClick={this.handleChange.bind(this,event, item)}>Destroy</a>
                  <td><Link to={{pathname: "./Show", state: {id: item.id}}} className="btn btn-primary">View</Link></td>
                </tr>
              })}
            </tbody>
          </Table> 
        </div>
      </>
    );
  }
}

export default Movie
