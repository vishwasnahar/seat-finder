import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Home'
import Movie from './Movie'
import ShowMovie from "./ShowMovie"
import NewMovie from "./NewMovie"
import EditMovie from './EditMovie'
class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Movie />} />
          <Route exact path='/seats' render={() => <Home />} />
          <Route exact path='/show' render={(props) => <ShowMovie {...props}/>} />
          <Route exact path='/new' render={(props) => <NewMovie {...props}/>} />
          <Route exact path='/edit' render={(props) => <EditMovie {...props}/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
