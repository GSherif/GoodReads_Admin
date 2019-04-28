import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//Admin
import AdminPanel from '../Components/Featured/Admin/Panel';
import LoginForm from '../Components/Shared/Forms/login';
import Header from '../Components/Shared/Header/Header';
import Footer from '../Components/Shared/Footer/Footer';
import ErrorPage from '../Components/Shared/ErrorPage/Error';

export default class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() =>
            <Redirect to="/login" />
          } />
          <Route exact path="/admin" component={AdminPanel} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/error" component={ErrorPage} />
        </Switch>
        <Footer />
      </Router>
    )
  }
}






