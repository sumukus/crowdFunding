import React, { Component } from "react";
import Layout from "../../components/layout";
import { Button , Table} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import {Link} from '../../routes';
import crowdFunding from "../../ethereum/crowdFunding";
import ShowRequestsRow from "../../components/rowRequest";

class showRequests extends Component{
static async getInitialProps(props){
        const {address} = props.query;

        const newCrowdFunding = crowdFunding(address);
        const totalRequests = await newCrowdFunding.methods.getRequest().call();
        const requestList = await Promise.all(
            Array(parseInt(totalRequests))
            .fill()
            .map((element, index) => {
                return newCrowdFunding.methods.requests(index).call();
            })
        );
        const totalContributor = await newCrowdFunding.methods.totalContributor().call();

        return {address , requestList, totalContributor, newCrowdFunding, totalRequests};
    }

    renderRows(){
        return this.props.requestList.map((request, index) => {
            return <ShowRequestsRow 
                key = {index}
                id = {index}
                request = {request}
                address = {this.props.address}
                totalContributor = {this.props.totalContributor}
            />;
        });
    }
    render(){
        return(
            <Layout>
                <h3>List of Requests</h3>
                <Link route = {`/crowdFundings/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: '10px'}}>Add Request</Button>
                    </a>
                </Link>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount(ether)</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Vote Count</Table.HeaderCell>
                            <Table.HeaderCell>Complete Status</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
                <h3>Found {this.props.totalRequests} Request(s)</h3>
            </Layout>
            
        );
    }
}

export default showRequests;