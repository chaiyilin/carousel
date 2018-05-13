import React, { Component } from "react";
import PropTypes from "prop-types";
import PaginationDot from "./PaginationDot";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Pagination extends Component {
  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const { index, dots } = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={this.handleClick}
        />
      );
    }

    return <Div>{children}</Div>;
  }
}

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired
};

export default Pagination;
