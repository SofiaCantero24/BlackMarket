import { cleanup, fireEvent, render, screen, waitFor } from '@/core/test-utils';
import type { LoginFormProps } from '@/types/auth/auth-types';

import { LoginForm } from './login-form';

afterEach(cleanup);

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn();

describe('LoginForm Form ', () => {
  const LOGIN_BUTTON = 'login-button';
  it('renders correctly', async () => {
    render(<LoginForm />);
    expect(await screen.findByText(/Log in/i)).toBeOnTheScreen();
  });

  it('should display error when values are invalid', async () => {
    render(<LoginForm />);

    const button = screen.getByTestId(LOGIN_BUTTON);
    expect(
      screen.queryByText(/Sorry! Your email or password are incorrect./i)
    ).not.toBeOnTheScreen();
    fireEvent.press(button);
    expect(
      await screen.findByText(/Sorry! Your email or password are incorrect./i)
    ).toBeOnTheScreen();
    expect(
      screen.getByText(/Sorry! Your email or password are incorrect./i)
    ).toBeOnTheScreen();
  });

  /*
  it('should display matching error when email is invalid', async () => {
    render(<LoginForm />);

    const button = screen.getByTestId(LOGIN_BUTTON);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.changeText(emailInput, 'yyyyy');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.press(button);

    expect(screen.queryByText(/Email is required/i)).not.toBeOnTheScreen();
    expect(await screen.findByText(/Invalid Email Format/i)).toBeOnTheScreen();
  });
  */

  it('Should call LoginForm with correct values when values are valid', async () => {
    render(<LoginForm onSubmit={onSubmitMock} />);

    const button = screen.getByTestId(LOGIN_BUTTON);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.changeText(emailInput, 'youssef@gmail.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(button);
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // undefined because we don't use second argument of the  SubmitHandler
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        email: 'youssef@gmail.com',
        password: 'password',
      },
      undefined
    );
  });
});
