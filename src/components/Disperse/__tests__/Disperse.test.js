import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Disperse } from '../Disperse';

describe('Disperse', () => {
  test('should throw error if amount entered by user is not a number', () => {
    render(<Disperse />);
    fireEvent.input(screen.getByRole('textbox'), {
      value: 'wallet-2 12s',
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/Line 1 wrong amount./i)).toBeInTheDocument();
  });

  test('should throw error if user does not enter a key value pair', () => {
    render(<Disperse />);
    fireEvent.input(screen.getByRole('textbox'), {
      value: 'wallet-2 =  12 23',
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/Line 1 wrong amount./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Error in line 1. Expecting a key value pair./i)
    ).toBeInTheDocument();
  });
});
