import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { depositCash, drawCash} from '../actions';

class Wallet extends Component {
  state = {
    isClicked: false,
    isConfirmBtnDisabled: false,
    value: 0.00,
    showPaymentOptions: false,
    option: '',
    concluded: false,
    operation: '',
  }

  validateConfirmButton = () => {
    const { value } = this.state;
    const ACCEPTABLE_VALUE = 0.00;
    const validValue = (value > ACCEPTABLE_VALUE);
    this.setState({ isConfirmBtnDisabled: !validValue });
  }
  
  setDefaultState = () => {
    const { deposit } = this.props;
    const { value, operation } = this.state;
    if (operation === 'deposit') deposit(parseInt(value))
    this.setState({
      isClicked: false,
      isConfirmBtnDisabled: false,
      value: 0.00,
      showPaymentOptions: false,
      option: '',
      concluded: false,
    });
  }

  handleConfirmClick = () => {
    const { operation, value } = this.state;
    const { draw } = this.props;
    if (operation === 'deposit') {
      this.setState({ showPaymentOptions: true });
    } else {
      /* this.setState({
        showPaymentOptions: false,
        message: 'Retirada Completa!'
      }); */
      draw(parseInt(value));
      this.setDefaultState();
    }
  }

  handleOptionClick = ({ target: { id } }) => {
    const { concluded } = this.state;
    this.setState({concluded: !concluded })
    switch (id) {
    case 'pix':
      this.setState({option: 'da chave Pix'});
      break;
    case 'boleto':
      this.setState({option: 'do boleto'});
      break;
    case 'trasnferencia':
      this.setState({option: 'com os dados para trasnferência bancária'});
      break;
    default:
      this.setState({option: ''});
    }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, () => this.validateConfirmButton());
  }

  handleOperationBtn = ({ target }) => {
    const { isClicked } = this.state;
    this.setState({ isClicked: !isClicked });
    if (target.id === 'drawBtn') {
      this.setState({ operation: 'draw'});
    } else {
      this.setState({ operation: 'deposit'});
    }
  }

  render() {
    const { cash } = this.props;
    const { isClicked, isConfirmBtnDisabled, value, showPaymentOptions, concluded, option } = this.state;
    return (
      <div>
        <Header/>
        <div>
          <h3>Saldo: R${cash}</h3>
        </div>
        <div>
          <Input 
            id="drawBtn"
            type="button"
            value="Realizar Retirada"
            onClick={ this.handleOperationBtn }
          />
          <Input 
            id="depositBtn"
            type="button"
            value="Realizar Depósito"
            onClick={ this.handleOperationBtn }
          />
          { isClicked && (
            <>
              <Input
                id="value"
                type="number"
                min="0"
                placeholder="Informe o valor"
                onChange={ this.handleChange }
                value={ value }
              />
              <Input
                type="button"
                value="Confirmar"
                disabled={ isConfirmBtnDisabled }
                onClick={ this.handleConfirmClick }
              />
              <Input
                type="button"
                value="Voltar"
                onClick={ () => this.setState({ isClicked: !isClicked })}
              />
              { showPaymentOptions && (
                <>
                <p>Escolha o método de depósito:</p>
                <Input
                  type="button"
                  id="pix"
                  value="Via Pix"
                  onClick={ this.handleOptionClick }
                />
                <Input
                  type="button"
                  id="boleto"
                  value="Via Boleto"
                  onClick={ this.handleOptionClick }
                />
                <Input
                  type="button"
                  id="trasnferencia"
                  value="Via Transferência"
                  onClick={ this.handleOptionClick }
                />
                { concluded && 
                  <>
                    <p>
                      As informações { option } foram enviadas para o email de cadastro.
                      Você possuí um prazo de 48 horas para concluir o pagamento, caso contrário ele será anulado. 
                    </p>
                    <Loading loaded={() => this.setDefaultState()}/>
                  </>
                } 
                </>
              )}
            </>
          )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  cash: user.cash,
});

const mapDispatchToProps = (dispatch) => ({
  deposit: (payload) => dispatch(depositCash(payload)),
  draw: (payload) => dispatch(drawCash(payload)),
})

Wallet.propTypes = {
  cash: PropTypes.number.isRequired,
  deposit: PropTypes.func.isRequired,
  draw: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);