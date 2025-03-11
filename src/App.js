
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
       <NavBar/>       
       <Switch>
          <Route exact path="/"><News apiKey={this.apiKey} pageSize={this.pageSize} country="us"/></Route>
          <Route exact path="/business"><News apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business"/></Route>
          <Route exact path="/entertainment"><News apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/></Route>
          <Route exact path="/general"><News apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general"/></Route>
          <Route exact path="/health"><News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health"/></Route>
          <Route exact path="/science"><News apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="science"/></Route>
          <Route exact path="/sports"><News apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="sports"/></Route>
          <Route exact path="/technology"><News apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology"/></Route>
        </Switch>
       </Router>
      </div>
    )
  }
}



