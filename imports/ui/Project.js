import React, { Component } from 'react';
import styled from 'styled-components';

import { Projects } from '../api/Projects.js';

const Desktop = styled.div`
    padding: 0.5em;
`;

const MyButton = styled.button`
    margin-right: 0.4em;
`;

const MyLabel = styled.label`
    margin-right: 0.5em;
    text-align: center;
`;

const TitleInput = styled.input`
    width: 100%;
`;

const InputArea = styled.div`
    padding-bottom: 1.0em;
`;

const DescriptionInput = styled.textarea`
    width: 100%;
    height: 6em;
`;

const TasksInput = styled.textarea`
    width: 100%;
    min-height: 40px;
    height: 37em;
`;

export default class Project extends Component {
    constructor(props) {
        super(props);

        this.project = this.props.location.state;
        //FIXME reflesh undefined
        if (this.project !== undefined && this.project !== null) {
            this.state = {
                title: this.project.title,
                description: this.project.description,
                tasks: this.project.tasks,
            };
        } else {
            this.state = {
                title: '',
                description: '',
                tasks: '',
            }
        }
        this.changed = false;

        this.navBackListener = this.navBackListener.bind(this);
        this.props.history.listen(this.navBackListener)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveChanged = this.saveChanged.bind(this);
    }

    navBackListener(location, action) {
        if (action === 'POP' && this.changed) {
            //FIXME
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.changed = true;
    }

    saveChanged() {
        if (this.changed) {
            if (this.project !== null) {
                Projects.update(this.project._id, {
                    $set: {
                        title: this.state.title,
                        description: this.state.description,
                        tasks: this.state.tasks
                    },
                });
            } else {
                Projects.insert({
                    title: this.state.title,
                    description: this.state.description,
                    tasks: this.state.tasks,
                    status: 'open',
                    times: 0, 
                    createdAt: new Date(),
                })
            }
        }
    }

    handleSubmit(event) {
        this.saveChanged();
        event.preventDefault();
    }

    render() {
        return (
            <Desktop>
                <form onSubmit={this.handleSubmit}>
                    <InputArea>
                        <MyLabel>Title: </MyLabel>
                        <TitleInput type='text' name='title' onChange={this.handleInputChange} value={this.state.title}></TitleInput>
                    </InputArea>
                    <InputArea>
                        <MyLabel>Description: </MyLabel>
                        <DescriptionInput name='description' onChange={this.handleInputChange} value={this.state.description}></DescriptionInput>
                    </InputArea>
                    <InputArea>
                        <MyButton>Edit</MyButton>
                        <MyButton>View</MyButton>
                        <input type='submit' value='Submit' />
                    </InputArea>
                    <InputArea>
                        <MyLabel>Tasks: </MyLabel>
                        <TasksInput type='textarea' name='tasks' onChange={this.handleInputChange} value={this.state.tasks}></TasksInput>
                    </InputArea>
                </form>
            </Desktop>
        );
    }
}

