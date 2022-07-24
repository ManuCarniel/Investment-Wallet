import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { /* setLoadingStatus, */ updateCash } from '../actions';

class Wallet extends Component {
  state = {
    isClicked: false,
    isConfirmBtnDisabled: false,
    value: 0.00,
    showPaymentOptions: false,
    option: '',
    concluded: false,
  }

  validateConfirmButton = () => {
    const { value } = this.state;
    const ACCEPTABLE_VALUE = 0.00;
    const validValue = (value > ACCEPTABLE_VALUE);
    this.setState({ isConfirmBtnDisabled: !validValue });
  }
  
  setDefaultState = () => {
    const { /* setStatus, */ deposit } = this.props;
    const { value } = this.state;
    deposit(parseInt(value))
    this.setState({
      isClicked: false,
      isConfirmBtnDisabled: false,
      value: 0.00,
      showPaymentOptions: false,
      option: '',
      concluded: false,
    });
    // setStatus(false);
  }

/*   componentDidUpdate = () => {
    const { isLoaded, deposit } = this.props;
    const { value } = this.state;
    if (isLoaded) deposit(parseInt(value)) /* && this.setDefaultState() */;
    //  console.log(typeof(value));
  

  handleConfirmClick = () => {
    this.setState({ showPaymentOptions: true });
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

  render() {
    const { cash, isDisabled } = this.props;
    const { isClicked, isConfirmBtnDisabled, value, showPaymentOptions, concluded, option } = this.state;
    return (
      <div>
        <Header/>
        <div>
          <h3>Saldo: R${cash}</h3>
        </div>
        <div>
          <Input 
            type="button"
            disabled={ isDisabled }
            value="Realizar Retirada"
          />
          { isDisabled && <p>Você só pode realizar retiradas a partir do valor mínimo de R$5,00</p> }
          <Input 
            id="depositBtn"
            type="button"
            value="Realizar Depósito"
            onClick={ () => this.setState({ isClicked: !isClicked })}
          />
          { isClicked && (
            <>
              <Input
                id="value"
                type="number"
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
  isDisabled: user.isDisabled,
  isLoaded: user.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  // setStatus: (payload) => dispatch(setLoadingStatus(payload)),
  deposit: (payload) => dispatch(updateCash(payload)),
})

Wallet.propTypes = {
  cash: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  // setStatus: PropTypes.func.isRequired,
  deposit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);