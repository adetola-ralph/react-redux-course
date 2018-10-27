import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingDots extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      frame: 1,
    };
  }

  componentDidMount() {
    const { interval } = this.props;

    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1, // eslint-disable-line
      });
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const stateDots = this.props.dots; // eslint-disable-line
    const { frame } = this.state;
    let dots = frame % (stateDots + 1);
    let text = '';

    while (dots > 0) {
      text += '.';
      dots -= 1;
    }

    return (
      <span {...this.props}>
        {text}
        &nbsp;
      </span>
    );
  }
}
LoadingDots.propTypes = {
  dots: PropTypes.number,
  interval: PropTypes.number,
};

LoadingDots.defaultProps = {
  dots: 3,
  interval: 300,
};

export default LoadingDots;
