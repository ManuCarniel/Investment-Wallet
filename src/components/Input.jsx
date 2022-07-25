import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css'

class Input extends Component {
  render() {
    const { id } = this.props;

    return (
      <div className='input-group'>
        <label 
          htmlFor={ id }
          className="user-label"
        >
          <input 
            { ...this.props }
            className="input"  
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Input;