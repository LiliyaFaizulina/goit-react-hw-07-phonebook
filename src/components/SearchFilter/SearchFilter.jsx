import { useDispatch } from 'react-redux';
import { FilterLabel, FilterInput } from './SearchFilter.styled';
import { changeFilter } from 'redux/filter/slice';

export const SearchFilter = () => {
  const dispatch = useDispatch();
  const handleInput = e => {
    const { value } = e.target;
    dispatch(changeFilter(value.toLowerCase()));
  };
  return (
    <>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput type="text" id="filter" onChange={handleInput} />
    </>
  );
};
