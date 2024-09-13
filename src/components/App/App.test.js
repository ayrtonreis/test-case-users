import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { usersData } from '../../mock/usersData';
import App from './App';

const FIRST_USER = usersData[0];

test('should render user list', () => {
  render(<App />);
  expect(screen.getByText(FIRST_USER.name)).toBeInTheDocument();
});

test('should remove a user', async () => {
  render(<App />);

  act(() => {
    screen.getAllByTestId('button-edit-item')[0].click();
  });

  await screen.findByTestId('modal-edit-create');

  act(() => {
    screen.getByTestId('button-delete').click();
  });

  expect(screen.queryByText(FIRST_USER.name)).not.toBeInTheDocument();
});

test('should edit a user', async () => {
  render(<App />);

  const newUserName = 'My new user';
  const newUserDetails = 'Details about the new user';

  // Edit the first user
  act(() => {
    screen.getAllByTestId('button-edit-item')[0].click();
  });

  // wait for the modal to be visible
  await screen.findByTestId('modal-edit-create');

  const nameInput = screen.getByTestId('input-username');
  fireEvent.change(nameInput, { target: { value: newUserName } });

  const aboutInput = screen.getByTestId('input-about');
  fireEvent.change(aboutInput, { target: { value: newUserDetails } });

  act(() => {
    screen.getByRole('button', { name: /save/i }).click();
  });

  // Assert the previous user information is not available anymore
  expect(screen.queryByText(FIRST_USER.name)).not.toBeInTheDocument();
  expect(screen.queryByText(FIRST_USER.about)).not.toBeInTheDocument();

  // Assert the user info was correctly updated
  expect(within(screen.getByTestId('users-list')).getByText(newUserName)).toBeInTheDocument();
  expect(within(screen.getByTestId('users-list')).getByText(newUserDetails)).toBeInTheDocument();
});

test('should create user', async () => {
  render(<App />);

  const newUserName = 'My new user';
  const newUserDetails = 'Details about the new user';

  const button = screen.getByTestId('button-add-user');
  act(() => {
    button.click();
  });

  // wait for the modal to be visible
  await screen.findByTestId('modal-edit-create');

  const nameInput = screen.getByTestId('input-username');
  fireEvent.change(nameInput, { target: { value: newUserName } });

  const aboutInput = screen.getByTestId('input-about');
  fireEvent.change(aboutInput, { target: { value: newUserDetails } });

  act(() => {
    screen.getByRole('button', { name: /add/i }).click();
  });

  expect(within(screen.getByTestId('users-list')).getByText(newUserName)).toBeInTheDocument();
  expect(within(screen.getByTestId('users-list')).getByText(newUserDetails)).toBeInTheDocument();
});
