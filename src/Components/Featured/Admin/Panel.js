import React from 'react';
import { Tabs, Container, Tab } from 'react-bootstrap';

import Authors from './Author/Listing';
import Books from './Books/Listing';
import Categories from './Categories/List';
export default class AdminPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            key: 'category',
        }
    }
    render() {
        return (
            <Container fluid={true} className="p-2 tabs">
                <Tabs className="link-mint" activekey={this.state.key} onSelect={key => this.setState({ key })}>
                    <Tab eventKey="category" title="Categories">
                        <Categories />
                    </Tab>
                    <Tab eventKey="books" title="Books">
                        <Books />
                    </Tab>
                    <Tab eventKey="authors" title="Authors">
                        <Authors />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}