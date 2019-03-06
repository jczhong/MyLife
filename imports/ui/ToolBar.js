import React, { Component } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';

MyContainer = styled(Container)`
    padding: 0px;
`;

MyButton = styled(Button)`
    border-radius: 0.0em;
`;

export default class ToolBar extends Component {
    render() {
        return (
            <MyContainer fluid>
                <Row className='align-items-center'>
                    <Col xs='auto'>
                        <ButtonGroup>
                            <MyButton>New Project</MyButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </MyContainer>
        );
    }
}