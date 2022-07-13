import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

const columnFilters = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function Filter() {
  const {
    filters: { filterByNumericValues },
    setFilterByName,
    applyFilterByNumericValues,
  } = useContext(TableContext);

  const validOptionsColumnFilters = columnFilters.filter((value) => (
    !filterByNumericValues.some(({ column }) => column === value)
  ));

  const [numericFilterInputs, setNumericFilterInput] = useState({
    column: validOptionsColumnFilters[0],
    comparison: 'maior que',
    value: 0,
  });

  function onChangeNumericFilterInput({ target: { name, value } }) {
    setNumericFilterInput({
      ...numericFilterInputs,
      [name]: value,
    });
  }

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          onChange={ (e) => setFilterByName(e.target.value) }
        />
      </div>
      <div>
        <select
          name="column"
          data-testid="column-filter"
          value={ numericFilterInputs.column }
          onChange={ onChangeNumericFilterInput }
        >
          {
            validOptionsColumnFilters.map((value) => (
              <option key={ value } value={ value }>{value}</option>
            ))
          }
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ numericFilterInputs.comparison }
          onChange={ onChangeNumericFilterInput }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="value"
          data-testid="value-filter"
          type="number"
          value={ numericFilterInputs.value }
          onChange={ onChangeNumericFilterInput }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setNumericFilterInput({
              column: validOptionsColumnFilters[0],
              comparison: 'maior que',
              value: 0,
            });
            applyFilterByNumericValues(numericFilterInputs);
          } }
        >
          filtrar
        </button>
      </div>
    </>
  );
}

export default Filter;
