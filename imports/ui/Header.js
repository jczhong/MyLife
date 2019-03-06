import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const HeaderBar = styled(Container)`
    color: #FFFFFF;
    background-color: #000000;
    padding: 8px;
`;

export default class Header extends Component {
    render() {
        return (
            <HeaderBar fluid>
                <Row>
                    <Col xs='2'>MyLife</Col>
                </Row>
            </HeaderBar>
        );
    }
}