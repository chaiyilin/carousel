import React from "react";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

const imgPath = [
  "fit1.jpg",
  "fit1.jpg",
  "fit1.jpg",
  "fit1.jpg",
  "fit1.jpg",
  "fit1.jpg",
  "fit1.jpg"
];
const images = imgPath.map(path => <img alt={path} src={require({ path })} />);
const Example = props => <Carousel itemsPerSlide={4}>{images}</Carousel>;

export default Example;
