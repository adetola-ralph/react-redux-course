import React from 'react';
import PropTypes from 'prop-types';

const SortArrowComponent = ({ display, order }) => {
  let element = '';
  if (display) {
    element = order === 'desc'
      ? <i className="fas fa-arrow-up" />
      : <i className="fas fa-arrow-down" />;
  }
  return element;
};

SortArrowComponent.propTypes = {
  display: PropTypes.bool,
  order: PropTypes.oneOf(['desc', 'asc']),
};

SortArrowComponent.defaultProps = {
  display: false,
  order: 'desc',
};

export default SortArrowComponent;
