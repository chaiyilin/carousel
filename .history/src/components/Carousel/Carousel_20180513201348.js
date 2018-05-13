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

const GalleryTabIcon = () => (
  <Flex justify="center">
    <IconBox w={13}>
      <Icon name="components--gallery--chevron-left" width="13" height="24" />
    </IconBox>
  </Flex>
);

const IconBox = styled(Box)`
  height: 30px;
`;
const TabControlLeft = styled(Box)`
  @media ${themeValue("mediaSize.smallMax")} {
    display: none;
  }
`;
const TabControlRight = styled(Box)`
  transform: scaleX(-1);
  right: 0;
  @media ${themeValue("mediaSize.smallMax")} {
    display: none;
  }
`;

const GalleryTabControl = styled(Flex)`
  color: ${themeValue("colors.dustyGray")};
  cursor: pointer;
  :hover {
    color: ${themeValue("colors.primary")};
  }
`;

const GalleryLeftIcon = props => (
  <GalleryTabControl align="center">
    <TabControlLeft w={60} {...props}>
      <GalleryTabIcon />
    </TabControlLeft>
  </GalleryTabControl>
);

const GalleryRightIcon = props => (
  <GalleryTabControl align="center">
    <TabControlRight w={60} {...props}>
      <GalleryTabIcon />
    </TabControlRight>
  </GalleryTabControl>
);

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
      // this index is from/for swipeable, might be greater than the slides count
      index: this.props.index,
      ...slice(React.Children.toArray(children), itemsPerSlide)
    };
  }

  rightClick = () => {
    this.setState(state => ({ index: this.state.index + 1 }));
  };

  leftClick = () => {
    this.setState(state => ({ index: this.state.index + 1 }));
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  slideRenderer = ({ index }) => {
    const { slidesCount, slides } = this.state;
    const slideIndex = mod(index, slidesCount);
    return <Flex key={index}>{slides[slideIndex]}</Flex>;
  };

  compose = Swipeable => {
    const { index, slidesCount } = this.state;
    return (
      <GalleryContainer>
        <Flex align="stretch">
          <GalleryLeftIcon onClick={this.leftClick} />
          <Swipeable
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideRenderer={this.slideRenderer}
          />
          <GalleryRightIcon onClick={this.rightClick} />
          <Pagination
            dots={slidesCount}
            index={index}
            onChangeIndex={this.handleChangeIndex}
          />
        </Flex>
      </GalleryContainer>
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
  replayInterval: PropTypes.number,
  allowAutoRePlay: PropTypes.bool,
  length: PropTypes.number
};

Carousel.defaultProps = {
  children: [],
  itemsPerSlide: 1,
  index: 0,
  replayInterval: 3000,
  allowAutoRePlay: false,
  length: 0
};
