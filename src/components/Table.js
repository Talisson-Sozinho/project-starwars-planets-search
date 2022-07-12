import React, { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';

const tableTitles = [
  'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
  'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
  'Url',
];

export default function Table() {
  const { data, filters, getTableData } = useContext(TableContext);

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const dataFiltered = data.filter(({ name }) => (
    name.includes(filters.filterByName.name)
  ));

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
