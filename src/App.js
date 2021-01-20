import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import UserDetail from './views/UserDetail';
import UserList from './views/UserList';
import './styles/app.css';
import './styles/user.css';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/user/:username">
                    <UserDetail />
                </Route>
                <Route path="/">
                    <UserList />
                </Route>
            </Switch>
        </Router>
    )
}

export default App  