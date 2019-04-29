import React from 'react';
import { deleteauthor } from '../../../../API/Authors';



import AddEditAuthorForm from './AddEdit';

export default class AuthorAdminCard extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditModal: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    handleClose = () => {
        this.setState({ showEditModal: false });
    }
    handleShow = () => {
        this.setState({ showEditModal: true });
    }


    ////delete author
    handleDelete = () => {
        const id = this.props._id;
        deleteauthor(id)
            .then((res) => {
                console.log(res);
                this.props.update();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        // console.log(this.props);
        return (

            <React.Fragment>
                <tr>
                    <td className="text-truncate">{this.props._id}</td>
                    <td className="text-truncate">{this.props.photourl}</td>
                    <td className="text-truncate">{this.props["firstname"]}</td>
                    <td className="text-truncate">{this.props["lastname"]}</td>
                    <td className="text-truncate">{this.props.birthdate}</td>
                    <td><i className="fas fa-edit" onClick={this.handleShow}></i></td>
                    <td><i className="fas fa-trash-alt" onClick={this.handleDelete}></i></td>
                </tr>
                {this.state.showEditModal && <AddEditAuthorForm show={this.state.showEditModal} onHide={this.handleClose} editmode {...this.props} update={this.props.update} />}
            </React.Fragment>
        )


    }
}
