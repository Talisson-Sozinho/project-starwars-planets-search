import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  async function getTableData() {
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      const dataProcessed = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setData(dataProcessed);
    } catch (e) {
      console.log(e);
    }
  }

  function setFilterByName(name) {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  }

  return (
    <TableContext.Provider value={ { data, filters, getTableData, setFilterByName } }>
      {children}
    </TableContext.Provider>
  );
}

export default TableContextProvider;

TableContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
