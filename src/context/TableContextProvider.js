import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
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
    getTableData();
  }, []);

  function setFilterByName(name) {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  }

  function applyFilterByNumericValues(numericFilterInputs) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          ...numericFilterInputs,
        },
      ],
    });
  }

  function removeFilter(columnForRemove) {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.filter(
        ({ column }) => columnForRemove !== column,
      ),
    });
  }

  function removeAllFilters() {
    setFilters({
      ...filters,
      filterByNumericValues: [],
    });
  }

  return (
    <TableContext.Provider
      value={ {
        data,
        filters,
        setFilterByName,
        applyFilterByNumericValues,
        removeFilter,
        removeAllFilters,
      } }
    >
      {children}
    </TableContext.Provider>
  );
}

export default TableContextProvider;

TableContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
