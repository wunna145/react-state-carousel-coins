import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Card from './Card';

test('renders Card component without crashing', () => {
  const { getByText } = render(
    <Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />
  );

  const titleElement = getByText(/Test Caption/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Card component correctly', () => {
    const tree = renderer
      .create(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />)
      .toJSON();
  
    expect(tree).toMatchSnapshot();
});