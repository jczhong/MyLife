import React, { Component } from 'react';

import Header from './Header';
import Home from './Home';
import ToolBar from './ToolBar';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <ToolBar />
                <Home />                 
            </React.Fragment>
        );
    }
}