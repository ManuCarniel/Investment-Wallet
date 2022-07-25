import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

class Footer extends Component {
  render() {
    return (
      <footer className="container-footer">
        <div className="wrap-footer">
          <nav>
            <div>
              <Link to="/wallet">
                <Input
                  type="button"
                  value="Carteira"
                />
              </Link>
            </div>
            <div>
              <Link to="/">
                <Input
                  type="button"
                  value="Sair"
                />
              </Link>  
            </div>
          </nav>
          </div>
      </footer>
    );
  }
}

export default Footer;