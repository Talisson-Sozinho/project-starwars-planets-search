import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filter() {
  const {
    filters: { filterByName: { name } },
    setFilterByName,
  } = useContext(TableContext);

  return (
    <input
      data-testid="name-filter"
      onChange={ (e) => setFilterByName(e.target.value) }
      value={ name }
    />
  );
}

export default Filter;
