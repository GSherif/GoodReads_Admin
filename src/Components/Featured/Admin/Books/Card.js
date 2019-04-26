/* eslint-disable lines-between-class-members */
import React from 'react';
// import { /*ListGroup,*/ Row, Col } from 'react-bootstrap';

import { context } from '../../../../App'
    ;

import EditBookForm from './AddEdit';

export default class BookAdminCard extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditModal: false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    handleClose = () => {
        this.setState({ showEditModal: false });
    }
    handleShow = () => {
        this.setState({ showEditModal: true });
    }
    handleDelete = (deleteHandler) => () => {
        deleteHandler(this.props.id);
    }
    render() {
        return (
            <context.Consumer>
                {
                    value => (
                        <React.Fragment>
                            {/* <ListGroup.Item as="li">
                                <Row className="no-gutters text-center">
                                    <Col sm={1} className="d-inline"><h4 className="text-truncate">{this.props.id}</h4></Col>
                                    <Col sm={3} className="d-inline"><h4 className="text-truncate">{this.props.cover}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props.title}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props.categoryId}</h4></Col>
                                    <Col sm={2} className="d-inline"><h4 className="text-truncate">{this.props.authorId}</h4></Col>
                                    <Col sm={1}><i className="fas fa-edit" onClick={this.handleShow} /></Col>
                                    <Col sm={1}><i className="fas fa-trash-alt" onClick={this.handleDelete(value.deleteBook)} /></Col>
                                </Row>
                            </ListGroup.Item> */}
                            <tr className="no-gutters text-center">
                                <td className="text-truncate">{this.props.id}</td>
                                <td className="text-truncate">{this.props.cover}</td>
                                <td className="text-truncate">{this.props.title}</td>
                                <td className="text-truncate">{this.props.categoryId}</td>
                                <td className="text-truncate">{this.props.authorId}</td>
                                <td>
                                    <i className="fas fa-edit" onClick={this.handleShow} />
                                </td>
                                <td>
                                    <i className="fas fa-trash-alt" onClick={this.handleDelete(value.deleteBook)} />
                                </td>
                            </tr>
                            {this.state.showEditModal && <EditBookForm show={this.state.showEditModal} onHide={this.handleClose} editmode {...this.props} />}
                        </React.Fragment>
                    )
                }
            </context.Consumer>
        );
    }
}