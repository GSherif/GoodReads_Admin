import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const loader = require('../../../Assets/loader.gif');
export default function LoaderGIF(props) {
    return (
        <Container fluid={true}>
            <Row className="justify-content-center">
                <Col sm={4} >
                    <img src={loader} alt="loading" />
                </Col>
            </Row>
        </Container>
    );
}