import React from 'react';
import './App.css';
import Table from './components/Table';
import TableContextProvider from './context/TableContextProvider';

function App() {
  return (
    <TableContextProvider>
      <span>Star Wars Planets</span>
      <Table />
    </TableContextProvider>
  );
}

export default App;
