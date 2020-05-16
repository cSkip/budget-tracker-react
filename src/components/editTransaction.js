import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditTransaction extends Component {

    constructor(props) {
        super(props)

        this.onChangeTransactionName = this.onChangeTransactionName.bind(this);
        this.onChangeTransactionAmount = this.onChangeTransactionAmount.bind(this);
        this.onChangeTransactionDescription = this.onChangeTransactionDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            name: '',
            amount: '',
            description: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/transactions/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    amount: res.data.amount,
                    description: res.data.description
                });
            })
            .catch((error) => {
                console.log(error);
            })
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

        const transactionObject = {
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description
        };

        axios.put('http://localhost:8000/api/transactions/' + this.props.match.params.id, transactionObject)
            .then((res) => {
                console.log(res.data)
                console.log('transaction successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        this.props.history.push('/transaction-list')
    }


    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeTransactionName}/>
                </Form.Group>

                <Form.Group controlId="Amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" value={this.state.amount} onChange={this.onChangeTransactionAmount}/>
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.description}
                                  onChange={this.onChangeTransactionDescription}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Transaction
                </Button>
            </Form>
        </div>);
    }
}
