import React, { Component } from 'react';
import HttpProvider from '../../providers/http-provider';
import { Button, Form, Table } from 'react-bootstrap';

class Login extends Component {
    state = {
        stage: 'LoggingIn',
        user: {},
        username: '',
        app: '',
        password: '',
        filter: '',
        data: [],
        filteredData: [],
        renderError: ''
    };
    render() {
        return <div className="container-fluid">{this.renderFrontPage()}</div>;
    }

    renderFrontPage() {
        if (this.state.data.length === 0) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">
                                        Inicio de sesión
                                    </h5>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="username"
                                                placeholder="Enter email"
                                                onChange={this.handleInput}
                                                value={this.state.username}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={this.handleInput}
                                                value={this.state.password}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicApp">
                                            <Form.Label>App</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="app"
                                                placeholder="App"
                                                onChange={this.handleInput}
                                                value={this.state.app}
                                            />
                                        </Form.Group>

                                        <Button
                                            variant="primary"
                                            type="button"
                                            onClick={this.handleLoginSubmit}
                                            disabled={
                                                this.state.username === '' ||
                                                this.state.app === '' ||
                                                this.state.password === ''
                                            }
                                        >
                                            Iniciar sesión
                                        </Button>
                                        <div style={{ marginTop: '10px' }}>
                                            <span style={{ color: 'red' }}>
                                                {this.state.renderError}
                                            </span>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Filter</Form.Label>
                        <Form.Control
                            type="text"
                            name="filter"
                            placeholder="Buscar"
                            onChange={this.handleSearch}
                            value={this.state.filter}
                        />
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>BookingId</th>
                                <th>Cliente</th>
                                <th>Fecha de Creación</th>
                                <th>Dirección</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!this.state.filter
                                ? this.state.data.map(this.populateTable)
                                : this.state.filteredData.map(
                                      this.populateTable
                                  )}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    handleLoginSubmit = async e => {
        e.preventDefault();
        console.log('yes');
        try {
            const headers = {
                Password: this.state.password,
                App: this.state.app
            };
            const user = await HttpProvider.put(
                `${this.state.username}`,
                {},
                headers
            );
            console.log(user);
            this.setState({
                user: user,
                renderError: ''
            });
            this.getData();
        } catch (e) {
            this.setState({ renderError: e.response.data });
        }
    };

    populateTable(element, index) {
        return (
            <tr key={index}>
                <td>{element.bookingId}</td>
                <td>{element.fullName}</td>
                <td>{element.bookingTime}</td>
                <td>{element.streetAddress}</td>
                <td>{element.bookingPrice}</td>
            </tr>
        );
    }

    getData = async () => {
        try {
            const state = { ...this.state };
            const headers = {
                token: this.state.user.sessionTokenBck,
                adminemail: this.state.user.email,
                App: this.state.app
            };
            const data = await HttpProvider.get(
                `contacto@tuten.cl/bookings?current=true`,
                headers
            );
            state.data = data.map(e => {
                return {
                    fullName:
                        e.tutenUserProfessional.tutenUser1.firstName +
                        ' ' +
                        e.tutenUserProfessional.tutenUser1.lastName,
                    bookingId: e.bookingId,
                    bookingTime: e.bookingTime,
                    bookingPrice: e.bookingPrice,
                    streetAddress: e.locationId.streetAddress
                };
            });
            state.renderError = '';
            console.log(state);
            this.setState(state);
            console.log(this.state);
        } catch (e) {
            this.setState({ renderError: e.response.data });
            console.log(e);
        }
    };

    handleInput = e => {
        const state = { ...this.state };
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState(state);
    };

    handleSearch = e => {
        const state = { ...this.state };
        state.filter = e.currentTarget.value;
        console.log(state);
        state.filteredData = state.data.filter(
            f => f.bookingId == state.filter
        );
        /*
            state.data.forEach(f => {
                if (f.bookingId.includes(state.filter)) {
                    state.filteredData.push(f);
                }
            });
      */
        console.log(state);
        this.setState(state);
    };
}

export default Login;
