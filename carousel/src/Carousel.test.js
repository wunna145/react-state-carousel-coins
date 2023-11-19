import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import renderer from 'react-test-renderer';
import TEST_IMAGES from "./_testCommon.js";

const photos = [
  { src: 'image1.jpg', caption: 'Caption 1' },
  { src: 'image2.jpg', caption: 'Caption 2' },
];

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

test('renders Carousel component without crashing', () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
  // If the component renders without errors, the test passes.
});

test('renders Carousel component correctly', () => {
  const tree = renderer.create(<Carousel photos={photos} title="Test Carousel" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('clicking on the right arrow increments the current card index', () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
  const rightArrow = screen.getByTestId('right-arrow');

  fireEvent.click(rightArrow);

  // Check that the current card index is incremented
  const cardNum = screen.getByText(/Image \d+ of \d+/);
  expect(cardNum).toHaveTextContent('Image 2 of 2'); // Assuming there are 2 photos
});

