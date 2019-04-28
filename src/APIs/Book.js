import axios from 'axios';
const server = "http://localhost:3000";

export function GetAllBooks() {
    axios.get(`${server}/api/books/`)
        .then(data => {
            this.setState({ books: data });
        })
        .catch(err => {
            // this.props.history.push('/error');
            console.log(err);
        });
}