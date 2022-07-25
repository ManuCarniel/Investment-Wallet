import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './Input';

class StocksTable extends Component {
  render() {
    const headerItems = ['Ticker',
      'Empresa',
      'Setor',
      'Cotação', 
      'Detalhes'];
    const {stocks} = this.props;
    return (
        <table>
        <thead>
          <tr>
            {headerItems.map((element, index) => (
              <th key={ index }>{ element }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { (stocks)
            .map(({ id, ticker, empresa, setor, cotacao }) => (
              <tr key={ id }>
                <td>{ ticker }</td>
                <td>{ empresa }</td>
                <td>{ setor }</td>
                <td>{ cotacao }</td>
                <td>
                  <Link to={`/stocks/${ticker}`}>
                    <Input 
                      type="button"
                      value="Detalhes"
                    />
                  </Link>
                </td>
              </tr>)) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({stocksMarket}) => ({
  stocks: stocksMarket.stocks});

StocksTable.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(StocksTable);