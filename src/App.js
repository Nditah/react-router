import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Prompt } from "react-router-dom";
import Route from "react-router-dom/Route";
import './App.css';

const User = (params) => {
  return ( <div><h1> User Profile </h1> <h2>Welcome {params.username} </h2></div> )
}

class App extends Component {
  state={
    loggedIn: false,
  }

  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><NavLink to="/" exact activeStyle={{color: "green"}} >Home</NavLink></li>
            <li><NavLink to="/about" exact activeStyle={{color: "green"}} >About</NavLink></li>
            <li><NavLink to="/user/john" exact activeStyle={{color: "green"}} >User John</NavLink></li>
            <li><NavLink to="/user/peter" exact activeStyle={{color: "green"}} >User Peter</NavLink></li>
          </ul>

          <input type="button" value={this.state.loggedIn ? "Logout" : "Login"} onClick={ this.loginHandle.bind(this) } />

          <Prompt 
          when={!this.state.loggedIn}
          message= { (location) => {
            return location.pathname.startsWith("/user") ? "Are you sure?" : true;
          }}
          />
       
        <Route path="/" exact strict render= {
          () => {
            return ( <h1>Welcome MarketPlace Home</h1>);
          }
        } />

        <Route path="/about" exact strict render= {
          () => {
            return ( <h1>About</h1>);
          }
        } />

        <Route path="/user/:username" exact strict render= { ({match}) => (
          this.state.loggedIn ? ( <User username= {match.params.username} />) : (<Redirect to= "/" />)
        )} />

        </div>
      </Router>
    );
  }
}

export default App;
