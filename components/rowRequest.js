import React, { Component } from "react";
import { Button, Message, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import crowdFunding from "../ethereum/crowdFunding";
import {Router} from "../routes";
class showRequestsRow extends Component{
    state = {
        errorMessage: "",
        loading: false,
        loadingFinalize: false
    }
    onApprove = async () =>{
        this.setState({loading: true, errorMessage:''})
        try{
            const accounts = await web3.eth.getAccounts();
            const newCrowdFunding = crowdFunding(this.props.address);
            await newCrowdFunding.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/crowdFundings/${this.props.address}/requests`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
        
    }

    finalize = async () => {
        this.setState({loadingFinalize: true, errorMessage:""})
        try{
            const accounts = await web3.eth.getAccounts();
            const newCrowdFunding = await crowdFunding(this.props.address);
            await newCrowdFunding.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replaceRoute(`/crowdFundings/${this.props.address}/requests`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loadingFinalize: false});

    }
    render(){
        const {id, request, totalContributor} = this.props;
        const readyToFinalize = request.voteCount > totalContributor/2;
        return (
            <><Table.Row disabled ={request.complete} positive={readyToFinalize && !request.complete}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                <Table.Cell>{request.voteCount}/{totalContributor}</Table.Cell>
                <Table.Cell>{request.complete.toString()}</Table.Cell>
                <Table.Cell>
                    { request.complete ? null: (
                        <Button color="green" onClick={this.onApprove} loading={this.state.loading}>Approve</Button>
                    )}
                </Table.Cell>
                <Table.Cell>
                    { request.complete ? null : (
                        <Button color = "teal" onClick={this.finalize} loading={this.state.loadingFinalize}>Finalize</Button>
                    )} 
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell colSpan={7}>
                    {this.state.errorMessage}
                </Table.Cell>
                
            </Table.Row></>
        );
    }
}

export default showRequestsRow;