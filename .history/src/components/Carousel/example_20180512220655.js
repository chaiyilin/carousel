import React from "react";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

const imgPath = [
  "./fit(1).jpg",
  "./fit(2).jpg",
  "./fit(3).jpg",
  "./fit(4).jpg",
  "./fit(5).jpg",
  "./fit(6).jpg",
  "./fit(7).jpg"
];
const images = imgPath.map(path => <img alt={path} src={require({ path })} />);
const Example = props => <Carousel itemsPerSlide={4}>{images}</Carousel>;

export default Example;
