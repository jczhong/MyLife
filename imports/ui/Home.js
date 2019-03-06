import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, CardColumns, Card, CardHeader, CardBody, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';

import { Projects } from '../api/Projects.js';

const MyContainer = styled(Container)`
    padding-top: 2em;
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.isDropdownOpen = this.isDropdownOpen.bind(this);
        this.state = {
            dropdownOpenId: -1
        };
    }

    toggle(id) {
        this.setState((prevState) => {
            if (prevState.dropdownOpenId == id) {
                return {dropdownOpenId: -1}
            } else {
                return {dropdownOpenId: id}
            }
        });
    }

    isDropdownOpen(id) {
        if (this.state.dropdownOpenId == -1) {
            return false;
        }
        if (this.state.dropdownOpenId == id) {
            return true;
        }
    }

    render() {
        const list = this.props.projects.map((project) => {
            return (
                <Card key={project._id}>
                    <CardHeader>
                        <Container>
                            <Row>
                                <Col><div className='font-weight-bold '>{project.title}</div></Col>
                                <Col>
                                    <Dropdown isOpen={this.isDropdownOpen(project._id)} toggle={() => this.toggle(project._id)}>
                                        <DropdownToggle>
                                            <FontAwesomeIcon icon={faBars} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Edit</DropdownItem>
                                            <DropdownItem>Expand Tasks</DropdownItem>
                                            <DropdownItem>Close</DropdownItem>
                                            <DropdownItem>Delete</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Container>
                    </CardHeader>
                    <CardBody>
                        <CardText>{project.description}</CardText>
                    </CardBody>
                </Card>
            );
        });
        return (
            <MyContainer>
                <CardColumns>
                    {list}
                </CardColumns>
            </MyContainer>
        );
    }
}

export default withTracker(() => {
    return {
        projects: Projects.find({}).fetch(),
    };
})(Home);