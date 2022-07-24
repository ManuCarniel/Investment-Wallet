import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { setLoadingStatus } from '../actions';

class Loading extends Component {
  state = {
    status: 'Aguardando',
  }

  timer = (seconds) =>  {
    let time = seconds * 1000
    return new Promise(res => setTimeout(res, time))
  }

  componentDidMount = async () => {
    const { /* setStatus, */ loaded } = this.props;
    await this.timer(5);
    this.setState({status: 'Concluído'});
    // setStatus(true);
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
  // setStatus: PropTypes.func.isRequired,
  loaded: PropTypes.func.isRequired,
};

export default Loading;
    
/* const mapDispatchToProps = (dispatch) => ({
  setStatus: (payload) => dispatch(setLoadingStatus(payload)),
});
 */
// export default connect(null, mapDispatchToProps)(Loading);