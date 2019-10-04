import React, { Component } from 'react';

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    Tuten React Test
                </a>
            </nav>
        );
    }
}

export default NavBar;
