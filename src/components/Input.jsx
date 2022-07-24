import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { id } = this.props;

    return (
      <label htmlFor={ id }>
        <input { ...this.props } />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Input;