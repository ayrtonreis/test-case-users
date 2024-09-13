import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { usersData } from '../../mock/usersData';

const FIRST_USER = usersData[0];

test('renders user list', () => {
  render(<App />);
  expect(screen.getByText(FIRST_USER.name)).toBeInTheDocument();
});
