import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, cash } = this.props;
    return (
      <header>
        <h4>Usuário: { email }</h4>
        <h4>Saldo: { cash }</h4>
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