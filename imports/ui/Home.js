import React, { Component } from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import { Projects } from '../api/Projects.js';

const Desktop = styled.div`
    padding: 0.5em;
`;

const MyTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const MyTd = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const MyTh = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const MyTr = styled.tr`
    background-color: #eeeeee;
`;

const MyButton = styled.button`
    margin-right: 0.4em;
`;

const MyToolbar = styled.div`
    margin-bottom: 0.4em;
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inEdit: false
        };

        this.newProject = this.newProject.bind(this);
        this.executeProject = this.executeProject.bind(this);
        this.closeProject = this.closeProject.bind(this);
        this.openProject = this.openProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    newProject() {
        this.props.history.push({
            pathname: '/project',
        });
    }

    executeProject(project) {
        let path = {
            pathname: '/project',
            state: project,
        };

        this.props.history.push(path);
    }

    closeProject(project) {
        Projects.update(project._id, {
            $set: {
                status: 'close'
            },
        });
    }

    openProject(project) {
        Projects.update(project._id, {
            $set: {
                status: 'open'
            },
        });
    }

    deleteProject(project) {
        Projects.remove(project._id);
    }

    renderActions(project) {
        if (project.status === 'open') {
            return (
                <MyTd>
                    <MyButton onClick={() => this.executeProject(project)}>Execute</MyButton>
                    <MyButton onClick={() => this.closeProject(project)}>Close</MyButton>
                </MyTd>
            );
        } else {
            return (
                <MyTd>
                    <MyButton onClick={() => this.openProject(project)}>Open</MyButton>
                    <MyButton onClick={() => this.deleteProject(project)}>Delete</MyButton>
                </MyTd>
            );
        }
    }

    renderProjects() {
        const list = this.props.projects.map((project) => {
            return (
                <tr key={project._id}>
                    <MyTd>{project.title}</MyTd>
                    <MyTd>{project.description}</MyTd>
                    {this.renderActions(project)}
                    <MyTd>{project.times}</MyTd>
                </tr>
            );
        });

        return list;
    }

    render() {
        return (
            <Desktop>
                <MyToolbar>
                    <MyButton onClick={this.newProject}>New Project</MyButton>
                </MyToolbar>
                <MyTable>
                    <tbody>
                        <MyTr>
                            <MyTh>Title</MyTh>
                            <MyTh>Description</MyTh>
                            <MyTh>Actions</MyTh>
                            <MyTh>Times(mins)</MyTh>
                        </MyTr>
                        {this.renderProjects()}
                    </tbody>
                </MyTable>
            </Desktop>
        );
    }
}

export default withTracker(() => {
    return {
        projects: Projects.find({}).fetch(),
    };
})(Home);