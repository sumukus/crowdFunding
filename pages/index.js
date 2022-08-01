import React from "react";
import { Button, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";

import crowdFundingFactory from "../ethereum/crowdFundingFactory";
import {Link} from "../routes";


class crowdFundingFactoryPage extends React.Component{
   static async getInitialProps(){
      const listOfCrowdFunding = await crowdFundingFactory.methods.getListOfCrowdFunding().call();
      return {listOfCrowdFunding};
   }

   renderListOfCrowdFunding(){
      const items = this.props.listOfCrowdFunding.map(address => {
         return{
            header: address,
            meta: "Address of the Crowdfunding Contract",
            description: (
               <Link route = {`/crowdFundings/${address}`}>
                  <a>View CrowdFunding</a>
               </Link>
            ),
            fluid: true
         };
      });

      return <Card.Group items={items} />;
   }
   
   render(){
      return (
         <Layout>
         <div>
            <h3> Open Crowdfunding</h3>
            <Link route="/crowdFunding/new">
               <a>
                  <Button
                  floated="right"
                  content = "Create Crowdfunding"
                  icon = "add circle"
                  primary />
               </a>
            </Link>
            
            {this.renderListOfCrowdFunding()}
         </div>
         </Layout>
         
      );
   }
}

export default crowdFundingFactoryPage;