import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TransactionTableRow from './transactionsTableRow';


export default class ListTransactions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: []
        };
    }
    getTransactions() {
        axios.get('http://localhost:8000/api/transactions/')
            .then(res => {
                this.setState({
                    transactions: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getTransactions()
    }

    updateTableData() {
        this.getTransactions()
        this.DataTable();
    }

    DataTable() {
        return this.state.transactions.map((res, i) => {
            return <TransactionTableRow obj={res} key={i}/>;
        });
    }

    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}
