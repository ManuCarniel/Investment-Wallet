import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from '../components/Input';

class StocksDetails extends Component {
  state = {
    message: '',
    isFinished: false,
  }
  
  buyOperation = () => {
    const { cash } = this.props;
    if (cash > 0) {
      this.setState({ message: 'Compra realizada', isFinished: true});
    } else {
      this.setState({message: 'Você não possui saldos, por favor realize um depósito e tente novamente', isFinished: true});
    }
  }

  handleClick = ({ target }) => {
    console.log(target.id);
    if (target.id === 'buyBtn') {
      this.buyOperation();
    } /* else {
      sellOperation();
    } */
  }
  
  render() {
    const headerItems = [
      'Empresa',
      'Setor',
      'Ação',
      'Quantidade',
      'Valor (R$)'];
    const { match: { params: { ticker } }, stocks, cash } = this.props;
    const objStock = stocks.find((element) => element.ticker === ticker);
    const { message, isFinished } = this.state;
    return (
      <>
      <div>
        <Header/>
          <div>
            <h1>Comprar/Vender Ação:</h1>
            <table>
            <thead>
              <tr>
                {headerItems.map((element, index) => (
                <th key={ index }>{ element }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr key={ objStock.id }>
                <td>{ objStock.empresa }</td>
                <td>{ objStock.setor }</td>
                <td>{ ticker }</td>
                <td> 100 </td>
                <td>{ 100*objStock.cotacao }</td>
              </tr>
            </tbody>
            </table>
          </div>
        {console.log(objStock)}
      </div>
      <div>
        <Input
          id="buyBtn"
          type="button"
          value="Comprar"
          onClick={ this.handleClick }
        />
        <Input
          type="number"
          placeholder="Valor"
          min="0"
          max={ cash }        
        />
      </div>
      <div>
        <Input
          id="sellBtn"
          type="button"
          value="Vender"
          onClick={ this.handleClick }
        />
        <Input
          type="number"
          placeholder="Valor"
          min="0"        
        />
      </div>
      {isFinished && <p>{message}</p>}
      </>
    );
  }
}

const mapStateToProps = ({stocksMarket, user}) => ({
  stocks: stocksMarket.stocks,
  cash: user.cash,
});

StocksDetails.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.any).isRequired,
  cash: PropTypes.number.isRequired, 
};

export default connect(mapStateToProps, null)(StocksDetails);