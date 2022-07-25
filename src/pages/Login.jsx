import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { addEmail } from '../actions';
import { Link } from 'react-router-dom';
import '../App.css'

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
      <div className="container">
        <div className="container-background">
          <div className="wrap-background">
            <div className="login-icon">
              <div>
                <h2>Bem vindo</h2>
              </div>
              <div>
                <h3>Login</h3>
              </div>
            </div>
            <div>
              <div>
                <Input
                  placeholder="email"
                  type="email"
                  name="email"
                  id="inputEmail"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                <Input
                  placeholder="senha"
                  type="password"
                  name="password"
                  id="inputPassword"
                  value={ password }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                <Link to="/stocks">
                  <Input
                    type="button"
                    name="loginBtn"
                    id="loginBtn"
                    value="Entrar"
                    disabled={ isDisabled }
                    onClick={ () => add(email) }
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
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