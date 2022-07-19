import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { apiJsonResponse } from './mock';

it('Deve ter uma heading com o texto "Star Wars Planets"', () => {
  render(<App />);
  const headingText = screen.getByRole("heading", /Star Wars Planets/i);
  expect(headingText).toBeInTheDocument();
});

it('Deve ter uma tabela com 13 colunas', () => {
  render(<App />);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
  const tableTitles = screen.getAllByRole("columnheader")
  expect(tableTitles).toHaveLength(13);
})

it('Deve existir input para filtrar por nome do planeta', () => {
  render(<App />);
  const nameFilterInput = screen.getByTestId("name-filter");
  expect(nameFilterInput).toBeInTheDocument();
  userEvent.type(nameFilterInput, 'nome de um planeta aleatório');
  expect(nameFilterInput).toHaveValue('nome de um planeta aleatório')
})

it('Deve existir 3 campos para filter numericamente', () => {
  render(<App />);
  const numberTitleFilterInput = screen.getAllByRole("combobox");
  expect(numberTitleFilterInput).toHaveLength(2);
  const numberFilterInput = screen.getByRole("spinbutton");
  expect(numberFilterInput).toBeInTheDocument();
})

it('Deve aplicar os mostrar corretamente os filtros aplicados', () => {
  render(<App />);
  const numberTitleFilterInput = screen.getAllByRole("combobox");
  const numberFilterInput = screen.getByRole("spinbutton");
  const filterButton = screen.getByRole("button", { name: /filtrar/i });

  userEvent.selectOptions(numberTitleFilterInput[0], "diameter");
  userEvent.selectOptions(numberTitleFilterInput[1], "igual a");
  userEvent.clear(numberFilterInput);
  userEvent.type(numberFilterInput, "10")
  userEvent.click(filterButton)

  const filterCard = screen.getByText('diameter igual a 10');
  expect(filterCard).toHaveTextContent('diameter igual a 10')
})

it('Deve filtrar corretamente pelo nome', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(apiJsonResponse),
  });

  render(<App />);

  const nameFilterInput = screen.getByTestId("name-filter");
  userEvent.type(nameFilterInput, "Tatooine");

  const tableResultArray = await screen.findAllByRole("row");
  expect(tableResultArray).toHaveLength(1);
})

it('Deve filter corretamente po numero', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(apiJsonResponse),
  });

  render(<App />);

  const numberTitleFilterInput = screen.getAllByRole("combobox");
  const numberFilterInput = screen.getByRole("spinbutton");
  const filterButton = screen.getByRole("button", { name: /filtrar/i });

  userEvent.selectOptions(numberTitleFilterInput[0], "diameter");
  userEvent.selectOptions(numberTitleFilterInput[1], "igual a");
  userEvent.clear(numberFilterInput);
  userEvent.type(numberFilterInput, "7200")
  userEvent.click(filterButton);

  const tableResultArray = await screen.findAllByRole("row");
  expect(tableResultArray).toHaveLength(1);
})
