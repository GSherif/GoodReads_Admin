import React, { Component } from 'react';
import './App.css';
import Routing from '../src/RouterModule/Router';

export const context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const contextValue = {
    }
    return (
      <context.Provider value={contextValue}>
        <Routing />
      </context.Provider>
    );
  }
}

export default App;
