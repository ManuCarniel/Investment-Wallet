import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends Component {
  render() {
    const { email, cash } = this.props;
    return (
      <header className="container-header">
        <div className='wrap-header'>
          <h4>Usuário: { email }</h4>
          <h4>Saldo: { cash }</h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  cash: user.cash
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  cash: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);