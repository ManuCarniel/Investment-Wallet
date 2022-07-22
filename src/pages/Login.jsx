import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { addEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  }

  validateForms = () => {
    const { email, password } = this.state;
    const REQUIRED_QUANTITY = 6;
    const validPassword = (password.length >= REQUIRED_QUANTITY);
    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(email);
    this.setState({
      isDisabled: !(validPassword && validEmail),
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForms());
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { add } = this.props;

    return (
      <div>
        <h3>Login</h3>
        <Input
          placeholder="email"
          type="email"
          name="email"
          id="inputEmail"
          value={ email }
          onChange={ this.handleChange }
        />
        <Input
          placeholder="senha"
          type="password"
          name="password"
          id="inputPassword"
          value={ password }
          onChange={ this.handleChange }
        />
          <Input
            type="button"
            name="loginBtn"
            id="loginBtn"
            value="Entrar"
            disabled={ isDisabled }
            onClick={ () => add(email) }
          />
      </div>
    );
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
};
  
const mapDispatchToProps = (dispatch) => ({
  add: (payload) => dispatch(addEmail(payload)),
});
  
export default connect(null, mapDispatchToProps)(Login);