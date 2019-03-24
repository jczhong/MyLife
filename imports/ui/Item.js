import React, { Component } from 'react';
import styled from 'styled-components';

import { ProjectContext } from './Project';

const ItemContainer = styled.div`
    display: flex;
`;

const ItemContent = styled.div`
    margin-right: 0.4em;
    color: ${props => props.execute ? 'red' : 'black'};
    text-decoration: ${props => props.close ? 'line-through' : 'none'};
`;

const ItemMR = styled.div`
    margin-right: 0.4em;
`;

export default class Item extends Component {
    //props: value, close
    constructor(props) {
        super(props);

        this.state = {
            execute: false,
            mins: 0,
            secs: 0,
        };

        this.executeItem = this.executeItem.bind(this);
        this.tick = this.tick.bind(this);
        this.renderExecuteArea = this.renderExecuteArea.bind(this);
        this.cancelExecute = this.cancelExecute.bind(this);
    }

    tick() {
        var min = Math.floor(this.timeGap / 60);
        var sec = this.timeGap - (min * 60);

        this.setState({
            mins: min,
            secs: sec
        });

        if (min === 0 & sec === 0) {
            Meteor.clearInterval(this.intervalHandler);

            if (this.callback !== undefined) {
                this.callback(25);
            }

            this.setState({
                execute: false,
            });
        }

        this.timeGap--;
    }

    executeItem() {
        this.setState({
            execute: true,
        });

        //25 mins
        this.timeGap = 25 * 60;
        //this.timeGap = 10;

        this.intervalHandler = Meteor.setInterval(this.tick, 1000);
    }

    cancelExecute() {
        Meteor.clearInterval(this.intervalHandler);

        if (this.callback !== undefined) {
            this.callback(25 - Math.round(this.timeGap/60));
        }

        this.setState({
            execute: false,
        });
    }

    renderExecuteArea() {
        if (this.state.execute) {
            return (
                <React.Fragment>
                    <ItemMR>{this.state.mins}:{this.state.secs}</ItemMR>
                    <button onClick={this.cancelExecute}>Cancel</button>
                </React.Fragment>
            );
        } else {
            if (this.props.close) {
                return (
                    <div></div>
                );
            } else {
                return (
                    <button onClick={this.executeItem}>Go</button>
                );
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <ProjectContext.Consumer>
                    {(callback) => {
                        if (this.callback === undefined && callback !== undefined) {
                            this.callback = callback;
                        }
                        return (
                            <ItemContainer>
                                <ItemContent
                                    execute={this.state.execute}
                                    close={this.props.close !== undefined ? this.props.close : false}>
                                    {this.props.value}
                                </ItemContent>
                                <ItemContainer>
                                    {this.renderExecuteArea()}
                                </ItemContainer>
                            </ItemContainer>
                        );
                    }}
                </ProjectContext.Consumer>
            </React.Fragment>
        );
    }
}