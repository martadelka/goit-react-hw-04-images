import { CiSearch } from 'react-icons/ci';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { useState } from 'react'
import { notifyInputQuerry } from '../Notify/Notify'

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const onInputChange = (event) => {
    const newQuery = event.currentTarget.value;
    setQuery(newQuery);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      notifyInputQuerry();
      return;
    }
    onSubmit(query);
    event.target.reset();
  };

  return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <CiSearch size={22} />
          </SearchFormButton>
          <SearchFormInput
            value={query}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onInputChange}
          />
        </SearchForm>
      </Header>
    );
};
