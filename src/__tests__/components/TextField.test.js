import { render, screen } from '@testing-library/react';
import TextField from '../../components/TextField';

describe('TextField', () => {
  it('input value and output should be matching', () => {
    const inputValue = 'hello world';
    const placeholder = 'Enter value';
    render(<TextField value={inputValue} placeholder={placeholder} />);
    const value = screen.getByTestId('textField').value;
    expect(value).toBe(inputValue);
  });

  it('Should have a valid placeholder', () => {
    const placeholder = 'Enter value';
    render(<TextField value={""} placeholder={placeholder} />);
    const value = screen.queryByPlaceholderText(placeholder);
    expect(value).toBe(placeholder);
  });
});