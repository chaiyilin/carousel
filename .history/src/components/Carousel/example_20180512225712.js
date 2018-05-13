import React from "react";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

const imgPath = [
  "fit1.jpg",
  "fit2.jpg",
  "fit3.jpg",
  "fit4.jpg",
  "fit5.jpg",
  "fit6.jpg",
  "fit7.jpg"
];
const images = imgPath.map(path => <img alt={path} src={"images/" + path} />);
const Example = props => <Carousel itemsPerSlide={4}>{images}</Carousel>;

export default Example;
