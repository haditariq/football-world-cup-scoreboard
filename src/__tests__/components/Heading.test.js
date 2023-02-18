import { render, screen } from '@testing-library/react';
import Heading from '../../components/Heading';

describe('Heading', () => {
  it('title passed should have a length', () => {
    render(<Heading title={'hello world'} />);
    const value = screen.getByTestId('heading').textContent;
    expect(value).not.toHaveLength(0);
  });
});
