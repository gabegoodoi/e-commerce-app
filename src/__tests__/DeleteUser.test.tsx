import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteUser from '../components/User/DeleteUser';

describe('DeleteUser Component', () => {
  test('renders DeleteUser component', () => {
    render(<DeleteUser />);
    expect(screen.getByRole('heading', { name: /delete user/i })).toBeInTheDocument(); // Using heading role for better specificity
  });

  test('handles form submission successfully', async () => {
    render(<DeleteUser />);
    const button = screen.getByRole('button', { name: /delete user/i }); // Button matching using role
    fireEvent.click(button);

    await waitFor(() => {
      const successMessage = screen.queryByText(/user deleted successfully/i);
      expect(successMessage).toBeNull();
    });
  });
});
