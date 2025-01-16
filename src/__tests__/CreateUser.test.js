import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import CreateUser from '../components/User/CreateUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../internationalization/i18n';

// Mock the global fetch function
global.fetch = jest.fn();

describe('CreateUser Component', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  it('posts the form and then sets the success message to true', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          email: 'teddyt@gmail.com',
          username: 'TtheTest',
          password: 'teddybearsrule1',
          name: {
            firstname: 'Theodore',
            lastname: 'Testeroni',
          },
          address: {
            city: 'N/A',
            street: 'N/A',
            number: 0,
            zipcode: '00000',
            geolocation: {
                lat: '0',
                long: '0',
            }
          },
          phone: '1234567890',
        }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <CreateUser />
      </QueryClientProvider>
    );

    // Simulate filling in the form fields
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'teddyt@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'TtheTest' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'teddybearsrule1' },
    });
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Theodore' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Testeroni' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '1234567890' },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByRole('button', { name: /create user/i }));

    // Wait for success message to appear
    await waitFor(() =>
      screen.getByText(/you have successfully created a new user/i)
    );

    // Assert that the success message is displayed
    expect(screen.getByText(/you have successfully created a new user/i)).toBeInTheDocument();

    // Assert fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/users',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'teddyt@gmail.com',
          username: 'TtheTest',
          password: 'teddybearsrule1',
          name: {
            firstname: 'Theodore',
            lastname: 'Testeroni',
          },
          address: {
            city: 'N/A',
            street: 'N/A',
            number: 0,
            zipcode: '00000',
            geolocation: {
                lat: '0',
                long: '0',
            }
          },
          phone: '1234567890',
        }),
      })
    );
  });

  it('shows error message when the API call fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          message: 'Failed to receive a response from the API. Please try again',
        }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <CreateUser />
      </QueryClientProvider>
    );

    // Simulate filling in the form fields
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'teddyt@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'TtheTest' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'teddybearsrule1' },
    });
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Theodore' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Testeroni' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '1234567890' },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByRole('button', { name: /create user/i }));

    // Wait for the error message to appear
    await waitFor(() =>
      screen.getByText(/Failed to receive a response from the API. Please try again/i)
    );

    // Assert that the error message is displayed
    expect(screen.getByText(/Failed to receive a response from the API. Please try again/i)).toBeInTheDocument();

    // Assert fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/users',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'teddyt@gmail.com',
          username: 'TtheTest',
          password: 'teddybearsrule1',
          name: {
            firstname: 'Theodore',
            lastname: 'Testeroni',
          },
          address: {
            city: 'N/A',
            street: 'N/A',
            number: 0,
            zipcode: '00000',
            geolocation: {
                lat: '0',
                long: '0',
            }
          },
          phone: '1234567890',
        }),
      })
    );
  });
});