import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
export default function ErrorPage(props) {
    return (
        <Container fluid={true}>
            <Row className="justify-content-center">
                <Col sm={4} >
                    <h1>Error! Page not Found</h1>
                    {/* <h1>{props.errormessage}</h1> */}
                </Col>
            </Row>
        </Container>
    );
}