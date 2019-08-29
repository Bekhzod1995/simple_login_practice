import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './components/form/FormPage';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statitics';
import Users from './components/Users';
class App extends Component {
    render () {
        return (
            <Router>
                <Route path="/" exact component={Form} />
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/dashboard" exact component={Statistics} />
                <Route path="/admin/users" exact component={Users} />
            </Router>
        );
    }
}

export default App;
