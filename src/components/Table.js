import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

const tableTitles = [
  'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
  'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
  'Url',
];

export default function Table() {
  const {
    data,
    filters: {
      filterByName,
      filterByNumericValues,
    },
  } = useContext(TableContext);

  const dataFiltered = data.filter((planet) => {
    if (planet.name.includes(filterByName.name)) {
      if (filterByNumericValues.length > 0) {
        return filterByNumericValues.every(({ column, value, comparison }) => {
          if (comparison === 'maior que' && +planet[column] > +value) {
            return true;
          }
          if (comparison === 'menor que' && +planet[column] < +value) {
            return true;
          }
          return comparison === 'igual a' && +planet[column] === +value;
        });
      }
      return true;
    }
    return false;
  });

  return (
    <table>
      <thead>
        <tr>
          {tableTitles.map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          dataFiltered.map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
