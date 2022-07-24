import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  state = {
    status: 'Aguardando',
  }

  timer = (seconds) =>  {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
  }

  componentDidMount = async () => {
    const { loaded } = this.props;
    await this.timer(5);
    this.setState({status: 'Concluído'});
    await loaded();
  };

  render() {
    const { status } = this.state;
    return (
      <>
        <h3>{status}</h3>
      </>);
  }
}

Loading.propTypes = {
  loaded: PropTypes.func.isRequired,
};

export default Loading;
