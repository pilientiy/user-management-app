import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// Мокування fetchUsers
jest.mock('./features/users/userSlice', () => ({
  fetchUsers: jest.fn(),
}));

test('renders the user management table', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Перевірка наявності заголовка
  expect(screen.getByText(/User Management Table/i)).toBeInTheDocument();
});
