import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import crowdFunding from "../ethereum/crowdFunding";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class contributeForm extends Component{
    state = {
        value: "",
        loading: false,
        errorMessage: ""
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const newCrowdFunding = crowdFunding(this.props.address);
        this.setState({loading: true, errorMessage:""})

        try{
            const accounts = await web3.eth.getAccounts();
            await newCrowdFunding.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/crowdFundings/${this.props.address}`)
        }catch(err){
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false})
        
    }
    render(){
        return (
            <Form onSubmit = {this.onSubmit} loading={this.state.loading} error = {!!this.state.errorMessage}>
                <Form.Field>
                    <label>Enter Amount to Contribute</label>
                    <Input 
                        label = "ether(s)"
                        labelPosition="right"
                        value = {this.state.value}
                        onChange = {
                            event => {
                                this.setState({value: event.target.value})
                             }
                        }
                    />
                </Form.Field>
                <Message 
                    error
                    header = "Something went wrong"
                    content = {this.state.errorMessage}
                />
                <Button primary>Contribute</Button>
            </Form>
        );
    }
}

export default contributeForm;