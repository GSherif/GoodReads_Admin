/* eslint-disable lines-between-class-members */
import React from 'react';
import axios from 'axios';
import { context } from '../../../../App';

import EditBookForm from './AddEdit';
import { server } from '../../../../API/Book';
export default class BookAdminCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleClose = () => {
        this.setState({ showEditModal: false });
    }
    handleShow = () => {
        this.setState({ showEditModal: true });
    }
    handleDelete() {
        console.log(this.props);
        debugger;
        axios.patch(`${server}/api/books/${this.props._id}/delete`)
            .then(res => {
                debugger;
                this.props.update();
            })
            .catch(err => {
                debugger;
                // this.props.history.push('/error');
                console.log(err);
            });
    }
    render() {
        return (
            <React.Fragment>
                <tr className="no-gutters text-center">
                    <td className="text-truncate">{this.props._id}</td>
                    <td className="text-truncate">{this.props.cover}</td>
                    <td className="text-truncate">{this.props.title}</td>
                    <td className="text-truncate">{this.props.categoryId._id}</td>
                    <td className="text-truncate">{this.props.authorId._id}</td>
                    <td>
                        <i className="fas fa-edit" onClick={this.handleShow} />
                    </td>
                    <td>
                        <i className="fas fa-trash-alt" onClick={this.handleDelete} />
                    </td>
                    {this.state.showEditModal && <EditBookForm show={this.state.showEditModal} onHide={this.handleClose} update={this.props.update} editmode {...this.props} />}
                </tr>
            </React.Fragment>
        );
    }
}