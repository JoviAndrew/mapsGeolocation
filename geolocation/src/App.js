import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/MapPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header> */}
          <Switch>
            <Route exact path="/" component= { Home }/>
            <Route path="*" render={() => <h1 className="mt-5"><strong>404 Not Found!</strong><br/><br/>The page you are looking for is nowhere to be found!</h1>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
