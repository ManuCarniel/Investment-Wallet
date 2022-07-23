import React, {Component} from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchStocks} from '../actions';
import StocksTable from '../components/StocksTable';
import Footer from '../components/Footer';

class Stocks extends Component {
  componentDidMount = async () => {
    const {fetch} = this.props;
    await (fetch()).payload;
  };

  render() {
    return (
      <div>
        <Header/>
        <StocksTable />
        <Footer />
      </div>
    );
  }
}

Stocks.propTypes = {
  fetch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchStocks())});

export default connect(null, mapDispatchToProps)(Stocks);