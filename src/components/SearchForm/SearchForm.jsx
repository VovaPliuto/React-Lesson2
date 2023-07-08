import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  onInputChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.props.onHandleSearch(this.state.searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmitForm}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.onInputChange}
          placeholder="What do you want to write?"
          name="search"
          value={this.state.searchQuery}
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
