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
});
