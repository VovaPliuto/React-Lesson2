import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onHandleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();

    onHandleSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchFormStyled onSubmit={onSubmitForm}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        onChange={onInputChange}
        placeholder="What do you want to write?"
        name="search"
        value={searchQuery}
        required
        autoFocus
      />
    </SearchFormStyled>
  );
};
