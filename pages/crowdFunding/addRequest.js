import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import crowdFunding from "../../ethereum/crowdFunding";
import web3 from "../../ethereum/web3";
import {Router, Link} from "../../routes";
class addRequest extends Component{
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

  
    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const newCrowdFunding = crowdFunding(this.props.address);
        this.setState({loading: true, errorMessage:""});
        try{
            await newCrowdFunding.methods.makeRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'), 
                this.state.recipient
            )
            .send({
                from: accounts[0]
            });
            Router.pushRoute(`/crowdFundings/${this.props.address}/requests`);
        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
        
    }
    render(){
        return(
            <Layout>
                <Link route={`/crowdFundings/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage} loading={this.state.loading}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value = {this.state.description}
                            onChange = {
                                event => {
                                    this.setState({description: event.target.value})
                                }
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
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
                    <Form.Field>
                        <label>Recipient Address</label>
                        <Input 
                            value = {this.state.recipient}
                            onChange = {
                                event => {
                                    this.setState({recipient: event.target.value})
                                }
                            }
                        />
                    </Form.Field>
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

export default addRequest;