import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the world of videogames/i);
  expect(linkElement).toBeInTheDocument();
});
