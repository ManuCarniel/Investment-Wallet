import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class MyStocks extends Component {
  render() {
    const headerItems = ['Ticker',
      'Empresa',
      'Setor',
      'Cotação'];
    const { stocks } = this.props;
    const hasStocks = (stocks.length >= 1)
    return (
      <div>
       { hasStocks &&
        <>
        <h2>Minhas Ações</h2>
        <table>
        <thead>
          <tr>
            {headerItems.map((element, index) => (
              <th key={ index }>{ element }</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {(stocks).map(({ id, ticker, empresa, setor, cotacao }) => (
          <tr key={ id }>
            <td>{ ticker }</td>
            <td>{ empresa }</td>
            <td>{ setor }</td>
            <td>{ cotacao }</td>
            <td>
              <Link to={`/stocks/${ticker}`}>
                <button type="button">Detalhes</button>
              </Link>
            </td>
          </tr>)) }
        </tbody>
        </table>
        </>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  stocks: user.stocks,
});

MyStocks.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(MyStocks);