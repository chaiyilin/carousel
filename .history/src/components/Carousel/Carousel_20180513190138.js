import React, { Component } from "react";
import PropTypes from "prop-types";
import chunk from "lodash.chunk";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import Pagination from "./Pagination";
import SupportTouch from "./SupportTouch";
import { Flex } from "rebass";
import styled from "styled-components";

const Div = styled.div`
  display: inline-block;
`;

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));
const AutoPlaySwipeableViews = autoPlay(VirtualizeSwipeableViews);

const slice = (items, itemsPerSlide) => {
  //const sliced = chunk(this.props.children.toArray, this.props.itemsPerSlide);
  const slides = chunk(items, itemsPerSlide);
  return {
    slides,
    slidesCount: slides.length,
    itemsCount: items.count
  };
};
export default class Carousel extends Component {
  constructor(props) {
    super(props);

    const { children, itemsPerSlide } = props;
    this.state = {
      // this index is from/for swipeable
      index: this.props.index,
      ...slice(React.Children.toArray(children), itemsPerSlide)
    };
  }

  /*   increase = () => {
    const { allowReplay, length, index } = this.state;
    if (allowReplay && index !== length - 1) {
      this.setState(state => ({ index: state.index + 1 }));
    }
  };

  decrease = () => {
    const { allowReplay, length, index } = this.state;
    if (allowReplay && index !== length - 1) {
      this.setState(state => ({ index: state.index + 1 }));
    }
  }; */

  slideRenderer = ({ index }) => {
    const { slidesCount, slides } = this.state;
    const slideIndex = mod(index, slidesCount);
    return <Flex key={index}>{slides[slideIndex]}</Flex>;
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  compose = Swipeable => {
    const { index, slidesCount } = this.state;
    return (
      <Div>
        <div>
          <Swipeable
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideRenderer={this.slideRenderer}
          />
        </div>

        <Pagination
          dots={slidesCount}
          index={index}
          onChangeIndex={this.handleChangeIndex}
        />
      </Div>
    );
  };

  render() {
    const Swipeable = this.props.allowAutoRePlay
      ? this.compose(AutoPlaySwipeableViews)
      : this.compose(VirtualizeSwipeableViews);
    return Swipeable;
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  itemsPerSlide: PropTypes.number,
  index: PropTypes.number,
  allowReplay: PropTypes.bool,
  replayInterval: PropTypes.number,
  allowAutoRePlay: PropTypes.bool,
  length: PropTypes.number
};

Carousel.defaultProps = {
  children: [],
  itemsPerSlide: 1,
  index: 0,
  allowReplay: true,
  replayInterval: 3000,
  allowAutoRePlay: false,
  length: 0
};
