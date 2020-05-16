import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import EditTransaction from "./components/editTransaction";
import ListTransactions from "./components/listTransactions";
import CreateTransaction from "./components/createTransaction";
import Button from "react-bootstrap/Button";

function App() {
    return (<Router>
        <div className="App">
            <header className="">
                <Navbar variant="success">
                    <Container>

                        <Navbar.Brand className="displayContents">
                            <Link to={"/create-transaction"}>
                                <Button size="sm" variant="info">Transaction manager</Button>
                            </Link>
                            <Link to={"/create-transaction"}>
                                <Button size="sm" variant="info"> Create Transaction</Button>

                            </Link>
                            <Link to={"/transaction-list"}>
                                <Button size="sm" variant="info">Transactions List</Button>
                            </Link>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </header>

            <Container>
                <Row>
                    <Col md={12}>
                        <div className="wrapper">
                            <Switch>
                                <Route exact path='/' component={CreateTransaction}/>
                                <Route path="/create-transaction" component={CreateTransaction}/>
                                <Route path="/edit-transaction/:id" component={EditTransaction}/>
                                <Route path="/transaction-list" component={ListTransactions}/>
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </Router>);
}

export default App;
