import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteUser from '../components/User/DeleteUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

global.fetch = jest.fn();

describe('DeleteUser Component', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  it('deletes the user and shows a success message', async () => {
    // Mock a successful DELETE request
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteUser />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/user id/i), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /delete user/i }));

    // Wait for the success message to appear
    await waitFor(() => screen.getByText(/user deleted successfully/i));

    expect(screen.getByText(/user deleted successfully/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/users/1',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('shows an error message when the delete request fails', async () => {
    // Mock a failed DELETE request
    fetch.mockResolvedValueOnce({ ok: false });

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteUser />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/user id/i), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /delete user/i }));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/an error occurred while deleting the account/i));

    expect(screen.getByText(/an error occurred while deleting the account/i)).toBeInTheDocument();
  });
});