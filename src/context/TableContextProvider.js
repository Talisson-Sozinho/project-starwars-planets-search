import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableContextProvider({ children }) {
  const [data, setData] = useState([]);

  async function getTableData() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    const dataProcessed = results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setData(dataProcessed);
  }

  return (
    <TableContext.Provider value={ { data, getTableData } }>
      {children}
    </TableContext.Provider>
  );
}

export default TableContextProvider;

TableContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
