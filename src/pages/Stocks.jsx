import React, {Component} from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchStocks} from '../actions';
import StocksTable from '../components/StocksTable';
import Footer from '../components/Footer';
import MyStocks from './MyStocks';

class Stocks extends Component {
  componentDidMount = async () => {
    const { fetch } = this.props;
    await (fetch()).payload;
  };

  render() {
    return (
      <div className="container">
        <Header/>
        <div className="container-background">
          <div className="wrap-body">
            <MyStocks/>
              <h1>Ações</h1>
            <StocksTable />
          </div>
        </div>
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