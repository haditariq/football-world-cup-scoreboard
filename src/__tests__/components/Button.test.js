import { render, screen } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button', () => {
  it('should render an active button', () => {
    render(<Button disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should render a disabled button', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should render a disabled button with title', () => {
    const title = 'Click me';
    render(<Button disabled={true} title={title} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.textContent).toBe(title);
  });

  it('should render an active button with title', () => {
    const title = 'Click me';
    render(<Button disabled={false} title={title} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button.textContent).toBe(title);
  });

  it('should have a class', () => {
    const className = 'classname';
    render(<Button disabled={false} title={''} className={className} />);
    const value = screen.getByRole('button').className;
    expect(value).toBe(className);
  });
});
