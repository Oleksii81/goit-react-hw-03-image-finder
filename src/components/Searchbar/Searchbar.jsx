import PropTypes from 'prop-types';
import { Component } from "react";
import { SearchStyles } from "./Searchbar.styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
    state={
        searchQuery: '',
    };

    onFormChange = event => {
        this.setState({searchQuery: event.currentTarget.value});
    };
   
    onFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
      
            toast.info('Please fill in the input field')
            return;
          }
        this.props.onSubmit(this.state.searchQuery);
        this.onFormReset();
    };
   
    onFormReset = () => {
        this.setState({searchQuery: ''})
    };

    render(){
        return (
            <>
                <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
                <SearchStyles>
            <div className="form">
                <input
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={this.onFormChange}
                value={this.state.searchQuery}
                />
                <button type="submit" className="button">
                <span className="button-label">Search</span>
                </button>
            </div>
            </SearchStyles>

            </>
        )  
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };