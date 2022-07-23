import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h4>Usuário: { email }</h4>
        <Input 
          type="button"
          value="Logout"
          id="logoutBtn"
        />
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);