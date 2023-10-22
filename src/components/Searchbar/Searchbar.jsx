import { Component } from "react";
import { SearchStyles } from "./Searchbar.styled";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
    state = {
      input: '',
    };
  
    search = e => {
      e.preventDefault();
      if (this.state.input.trim() === '') {
        toast.error('Please enter a valid search query.');
        return;
      }
      this.props.getInputValue(this.state.input);
      this.setState({ input: '' });
    };
  
    handleChange = e => {
      this.setState({ input: e.target.value });
    };

    render() {
        return (
            <SearchStyles onSubmit={this.search}>
            <div className="form">
                <input
                className="input"
                name="input"
                type="text"
                autoComplete="off"
                onChange={this.handleChange}
                value={this.state.input}
                autoFocus
                placeholder="Search images and photos"
                />
                <button type="submit" className="button">
                <span className="button-label">Search</span>
                </button>
            </div>
            </SearchStyles>
        )  
    };
};
