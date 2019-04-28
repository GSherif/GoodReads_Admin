import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Admin
import AdminPanel from '../Components/Featured/Admin/Panel';
import LoginForm from '../Components/Shared/Forms/login';
import Header from '../Components/Shared/Header/Header';
import Footer from '../Components/Shared/Footer/Footer';

export default class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/admin" component={AdminPanel} />
        </Switch>
        <Footer />
      </Router>
    )
  }
}






