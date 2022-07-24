import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer>
        <nav>
          <Link to="/wallet">
            <button>
              Carteira
            </button>
          </Link>
          <Link to="/">
            <button>    
              Sair
            </button>
          </Link>  
        </nav>
      </footer>
    );
  }
}

export default Footer;