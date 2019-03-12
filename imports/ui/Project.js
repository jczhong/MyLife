import React, { Component } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

import { Projects } from '../api/Projects.js';
import Item from './Item';

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

const TasksView = styled.div`
    width: 100%;
    border: 1px solid #dddddd;
    padding: 1em;
`;

const TasksContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Task = styled.ul``;

const ActionArea = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1.0em;
`;

export const ProjectContext = React.createContext();

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
            this.times = this.project.times;
        } else {
            this.state = {
                title: '',
                description: '',
                tasks: '',
            }
            this.times = 0;
        }
        this.changed = false;

        this.navBackListener = this.navBackListener.bind(this);
        this.props.history.listen(this.navBackListener)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveChanged = this.saveChanged.bind(this);
        this.handleTabKeydown = this.handleTabKeydown.bind(this);
        this.reportTimes = this.reportTimes.bind(this);
    }

    navBackListener(location, action) {
        if (action === 'POP' && this.changed) {
            this.saveChanged();
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
            if (this.project !== undefined) {
                Projects.update(this.project._id, {
                    $set: {
                        title: this.state.title,
                        description: this.state.description,
                        tasks: this.state.tasks,
                        times: this.times
                    },
                });
            } else {
                Projects.insert({
                    title: this.state.title,
                    description: this.state.description,
                    tasks: this.state.tasks,
                    status: 'open',
                    times: this.times,
                    createdAt: new Date(),
                })
            }
        }
    }

    handleSubmit(event) {
        this.saveChanged();
        event.preventDefault();
    }

    handleTabKeydown(event) {
        if (event.keyCode == 9) {
            event.preventDefault();

            var val = this.state.tasks,
                start = event.target.selectionStart,
                end = event.target.selectionEnd;

            this.setState(
                {
                    tasks: val.substring(0, start) + '\t' + val.substring(end)
                },
                () => {
                    this.refs.tasks.selectionStart = this.refs.tasks.selectionEnd = start + 1
                }
            );
        }
    }

    reportTimes(times) {
        this.times += times;
        this.changed = true;
    }

    render() {
        return (
            <Desktop>
                <form>
                    <InputArea>
                        <MyLabel>Title: </MyLabel>
                        <TitleInput type='text' name='title' onChange={this.handleInputChange} value={this.state.title}></TitleInput>
                    </InputArea>
                    <InputArea>
                        <MyLabel>Description: </MyLabel>
                        <DescriptionInput name='description' onChange={this.handleInputChange} value={this.state.description}></DescriptionInput>
                    </InputArea>
                    <ActionArea>
                        <MyButton onClick={this.handleSubmit}>Submit</MyButton>
                        <div>{this.times} mins</div>
                    </ActionArea>
                    <InputArea>
                        <MyLabel>Tasks: </MyLabel>
                        <TasksContainer>
                            <TasksView>
                                <TasksInput type='textarea' name='tasks' ref='tasks' onChange={this.handleInputChange} onKeyDown={this.handleTabKeydown} value={this.state.tasks}></TasksInput>
                            </TasksView>
                            <TasksView>
                                <ProjectContext.Provider value={this.reportTimes}>
                                    <Markdown
                                        children={this.state.tasks}
                                        options={{
                                            overrides: {
                                                Task,
                                                Item,
                                            },
                                        }} />
                                </ProjectContext.Provider>
                            </TasksView>
                        </TasksContainer>
                    </InputArea>
                </form>
            </Desktop>
        );
    }
}