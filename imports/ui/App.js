import React, { Component } from 'react';
import styled from 'styled-components';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Project from './Project';

const Header = styled.div`
    width: 100%;
    margin-lefg: auto;
    margin-right: auto;
    background-color: #000000;
    padding: 8px;
    color: #FFFFFF;
`;

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Header>MyLife</Header>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/project' component={Project} />
                        <Redirect to='/' />
                    </Switch>
                </React.Fragment>
            </HashRouter>
        );
    }
}