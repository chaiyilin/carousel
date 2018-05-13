import React from "react";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

const imgPath = [1, 2, 3, 4, 5, 6, 7];
const images = imgPath.map(path => <img alt={path} src={require({ path })} />);
const Example = props => <Carousel itemsPerSlide={4}>{images}</Carousel>;

export default Example;
