import React from 'react'
import { context } from '../../../../App'
  ;
import SimpleSchema from 'simpl-schema';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';

export default class AdminCategoriesAddEditForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.editmode) {

      this.state = {
        name: this.props.name,
        errors: []
      }
      // console.log(this.props)
    }
    else {
      this.state = {
        name: " ",
        errors: []
      }
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.hadlechange = this.hadlechange.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  hadlechange(e) {
    this.setState({ name: e.target.value })
    // console.log(e.target.value)
  }
  handleClose(e) {
    this.props.onHide();
    if (this.props.editmode) {
      this.setState({
        errors: [],
      });
    }
    else {
      this.setState(
        {
          errors: [],
          name: " ",
        })
    }
  }
  handleAdd = (value) => (e) => {
    e.preventDefault();

    const formValidatorCtx = new SimpleSchema({
      name: {
        type: String, required: true, min: 3, max: 50
      },
    }, { requiredByDefault: false }).newContext();
    formValidatorCtx.validate({ name: this.state.name });
    if (formValidatorCtx.validationErrors().length === 0) {
      const newCategory = {
        id: uuidv1(),
        name: this.state.name,
        deleted: false,
      };
      const categories = value.Categories.slice();
      if (this.props.editmode) {
        newCategory.id = this.props.id;
        newCategory.index = categories.findIndex(a => a.id === newCategory.id)
        const editedCategory = categories[newCategory.index];
        editedCategory.name = this.state.name;
        categories[newCategory.index] = editedCategory;
        value.setCategories(categories);
        // console.log(categories);
        this.setState({
          name: editedCategory.name,
          errors: [],
        });
      }
      else {
        const newCategories = [...categories].concat(newCategory)
        value.setCategories(newCategories);
        // console.log(newCategories);
        this.setState({
          name: "",
          errors: [],
        });
      }
      this.props.onHide();

    }
    else {
      this.setState({ errors: formValidatorCtx.validationErrors() })
    }
  }
  render() {
    return (
      <context.Consumer>
        {
          value => (
            <Modal show={this.props.show} onHide={this.props.onHide} >
              <Modal.Header closeButton>
                <h3  >{this.props.editmode ? ' Edit Category' : 'Add Category'}</h3>
              </Modal.Header>
              <Modal.Body>
                <Form className="AddCategory ">
                  <Form.Group as={Row} className="ml-3 " >
                    <Form.Label sm={2} >
                      Category Name
                   </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        value={this.state.name}
                        onChange={this.hadlechange}
                        isInvalid={this.state.errors.length} />
                      {
                        this.state.errors.length > 0 &&
                        <Form.Control.Feedback type="invalid">Category Name is not Valid</Form.Control.Feedback>
                      }
                    </Col>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="bg-mint category-btn" type="submit" onClick={this.handleAdd(value)}>
                  {this.props.editmode ? 'Save Changes' : 'Add '}
                </Button>
                <Button className="bg-mint category-btn border-0" onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>)

        }

      </context.Consumer>
    )
  }
}