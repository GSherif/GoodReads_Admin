import axios from 'axios';
export const server = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';


export async function GetAllBooks() {
    let output = [];
    await axios.get(`${server}/api/books/`)
        .then(data => {
            debugger
            output = data.data;
            // console.log(output);
            return output;
        })
        .catch(err => {
            // this.props.history.push('/error');
            console.log(err);
        });
}
export function GetBookById(id) {
    let output = {};
    axios.get(`${server}/api/books/${id}/details`)
        .then(data => {
            output = data;
        })
        .catch(err => {
            // this.props.history.push('/error');
            console.log(err);
        });
    return output;
}
export async function EditBook(book) {
    // let output = {};
    return await axios.patch(`${server}/api/books/${book._id}/edit`, {
        ...book
    })

    // return output;
}
export function DeleteBookById(id) {
    let output = {};

    axios.patch(`${server}/api/books/${id}/delete`)
        .then(data => {
            debugger
            output = data;
        })
        .catch(err => {
            // this.props.history.push('/error');
            console.log(err);
        });
    return output;
}
export async function AddBook(book) {
    // let output = {};
    debugger;
    return await axios.post(`${server}/api/books/add`, {
        ...book
    })
    // .then(data => {
    //     debugger
    //     output = data;
    // })
    // .catch(err => {
    //     // this.props.history.push('/error');
    //     console.log(err);
    // });
    // return output;
}
