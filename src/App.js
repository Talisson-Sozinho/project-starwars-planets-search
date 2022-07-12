import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import TableContextProvider from './context/TableContextProvider';

function App() {
  return (
    <TableContextProvider>
      <span>Star Wars Planets</span>
      <Filter />
      <Table />
    </TableContextProvider>
  );
}

export default App;
