import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from '../components/Input';
import { addStock, depositCash, drawCash, removeStock } from '../actions';
import Footer from '../components/Footer';

class StocksDetails extends Component {
  state = {
    message: '',
    isFinished: false,
  }
  
  buyOperation = () => {
    const { match: { params: { ticker } }, cash, stocks, add, buy } = this.props;
    if (cash > 0) {
      this.setState({ message: 'Compra realizada', isFinished: true});
      const objStock = stocks.find((element) => element.ticker === ticker);
      add(objStock);
      buy(parseInt(objStock.cotacao));
    } else {
      this.setState({message: 'Você não possui saldos, por favor realize um depósito e tente novamente', isFinished: true});
    }
  }

  sellOperation = () => {
    const { myStocks, match: { params: { ticker } }, stocks, remove, sell } = this.props;
    const find = myStocks.some((element) => element.ticker === ticker);
    if (find) {
      this.setState({ message: 'Venda realizada', isFinished: true});
      const objStock = stocks.find((element) => element.ticker === ticker);
      remove(objStock);
      sell(parseInt(objStock.cotacao));
    } else {
      this.setState({message: 'Você ainda não comprou esta ação', isFinished: true});
    }
  }

  handleClick = ({ target }) => {
    if (target.id === 'buyBtn') {
      this.buyOperation();
    } else {
      this.sellOperation();
    }
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
      <Footer/>
      </>
    );
  }
}

const mapStateToProps = ({stocksMarket, user}) => ({
  stocks: stocksMarket.stocks,
  cash: user.cash,
  myStocks: user.stocks,
});

const mapDispatchToProps = (dispatch) => ({
  add: (payload) => dispatch(addStock(payload)),
  remove: (payload) => dispatch(removeStock(payload)),
  sell: (payload) => dispatch(depositCash(payload)),
  buy: (payload) => dispatch(drawCash(payload)),
});

StocksDetails.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.any).isRequired,
  cash: PropTypes.number.isRequired, 
  add: PropTypes.func.isRequired,
  myStocks: PropTypes.arrayOf(PropTypes.any).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksDetails);