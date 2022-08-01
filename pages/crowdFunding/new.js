import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, FormField, Input, Message} from "semantic-ui-react";
import Layout from "../../components/layout";
import crowdFundingFactory from "../../ethereum/crowdFundingFactory";
import web3 from "../../ethereum/web3";

import {Router} from "../../routes";

class crowdFundingNew extends Component{
    state = {
        minimumContribution: '',
        errorMessage: '',
        loadingStatus: false
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loadingStatus: true, errorMessage:""});
        try{
            const accounts = await web3.eth.getAccounts();
            await crowdFundingFactory.methods.createCrowdFunding(web3.utils.toWei(this.state.minimumContribution, 'ether'))
                .send({
                    from: accounts[0]
                });

            Router.pushRoute("/");
        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loadingStatus: false});
        
    }

    render(){
        return (
            <Layout>
                <h3>Create new CrowdFunding Campaign</h3>
                <Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage} loading={this.state.loadingStatus}>
                    <FormField>
                        <label>
                            Minimum Contributions
                        </label>
                        <Input 
                            label = "ether(s)"
                            labelPosition ="right"
                            value = {this.state.minimumContribution}
                            onChange = {
                                event => {this.setState({minimumContribution: event.target.value})}
                            }
                        />
                    </FormField>
                    <Message 
                        error
                        header = "Something went wrong"
                        content = {this.state.errorMessage}
                    />
                    <Button primary>Create</Button>
                    
                </Form>
            </Layout>
        );
    }
}

export default crowdFundingNew;