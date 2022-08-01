import React, { Component } from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"
import Layout from "../../components/layout";
import crowdFunding from "../../ethereum/crowdFunding";
import web3 from "web3";
import ContributeForm from "../../components/contributeForm";
import {Link} from "../../routes";

class showCrowdFunding extends Component{
    static async getInitialProps(props){
        const newCrowdFunding = crowdFunding(props.query.address);
        const crowdFundingDetails = await newCrowdFunding.methods.getCrowdFundingDetails().call();
        return {
            address: props.query.address,
            minimumContribution: crowdFundingDetails[0],
            totalContributors: crowdFundingDetails[1],
            totalRequest: crowdFundingDetails[2],
            owner: crowdFundingDetails[3],
            balance: crowdFundingDetails[4]
        }
    }

    renderCrowdFundingDetails(){
        const {
            minimumContribution,
            totalContributors,
            totalRequest,
            owner,
            balance
        } = this.props;

        const items = [
            {
                header: owner,
                meta: "Address of Crowd Funding Creator",
                description: "Owner can create request and also finalize request",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(minimumContribution, "ether"),
                meta: "Minimum Amount",
                description: "Minimum amount of ether(s) you can donate in order to become contributor"
            },
            {
                header: totalContributors,
                meta: "Total Contributors",
                description: "Total number of people who contributed to this crowd funding"
            }, 
            {
                header: totalRequest,
                meta: "Total Request",
                description: "The number of request made by owner to disburse fund"
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Total Balance",
                description: "The total amount that the crowd funding has acquired"
            }
        ];

        return <Card.Group items={items}/>
    }
    render(){
        return(
            <Layout>
                <h2>Details of the Crowd Funding Campaign</h2>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            {this.renderCrowdFundingDetails()}
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <ContributeForm address = {this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <Link route = {`/crowdFundings/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </Layout>
            
        );
    }
}

export default showCrowdFunding;