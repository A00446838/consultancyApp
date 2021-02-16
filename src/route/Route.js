import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "../container/Login/Login";
import UserProfile from "../container/UserHomePage/UserHomePage";
import Queries from "../container/Queries/Queries";
// import withAuth from "./withAuth";

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
        <Route exact path="/login" name="login" component={Login} />
        <Route exact path="/profile" name="profile" component={UserProfile} />
    </Switch>
);

export default Routes;