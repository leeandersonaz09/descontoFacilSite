import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from "./pages/auth";
import PrivateRoute from "./PrivateRoute";
import Login from './pages/Login';
import Home from './pages/Home';
import addNew from './pages/AddNew';

export default function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" exact component={Login} />
          <PrivateRoute exact path="/" exact component={Home} />
          <PrivateRoute exact path="/addNew" exact component={addNew} />
        </Switch>
      </Router>
    </AuthProvider>

  );
}