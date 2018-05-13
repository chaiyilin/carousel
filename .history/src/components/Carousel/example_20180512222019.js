import React from "react";
import PropTypes from "prop-types";

import Carousel from "./Carousel";

const imgPath = ["/src/components/Carousel/fit(1).jpg"];
const images = imgPath.map(path => <img alt={path} src={require({ path })} />);
const Example = props => <Carousel itemsPerSlide={4}>{images}</Carousel>;

export default Example;
