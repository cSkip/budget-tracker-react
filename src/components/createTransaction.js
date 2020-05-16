import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import ListTransactions from './listTransactions';
import Swal from 'sweetalert2';


export default class CreateTransaction extends Component {
    constructor(props) {
        super(props)

        this.onChangeTransactionName = this.onChangeTransactionName.bind(this);
        this.onChangeTransactionAmount = this.onChangeTransactionAmount.bind(this);
        this.onChangeTransactionDescription = this.onChangeTransactionDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.listTransactions = React.createRef()

        this.state = {
            name: '',
            description: '',
            amount: ''
        }
    }

    onChangeTransactionName(e) {
        this.setState({name: e.target.value})
    }

    onChangeTransactionAmount(e) {
        this.setState({amount: e.target.value})
    }

    onChangeTransactionDescription(e) {
        this.setState({description: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const transaction = {
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description,
            type: this.state.type
        };
        axios.post('http://localhost:8000/api/transactions/', transaction)
            .then((res) => this.setState({res}))
            .then((res) => this.listTransactions.current.updateTableData());
        Swal.fire(
            'Success',
            'Transaction Added',
            'success'
        )

        this.setState({name: '', amount: '', description: ''})
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={this.onChangeTransactionName}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" value={this.state.amount}
                                          onChange={this.onChangeTransactionAmount}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" type="textarea" value={this.state.description}
                                  onChange={this.onChangeTransactionDescription}/>
                </Form.Group>

                <Button variant="primary" size="lg" block="block" type="submit">
                    Add Transaction
                </Button>
            </Form>
            <ListTransactions ref={this.listTransactions}/>
        </div>);
    }
}
