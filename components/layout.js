import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./header";

import {Link} from "../routes";

export default props => {
    return (
        <Container style = {{ marginTop: "10px"}}>

            <div>
                <Header />
                {props.children}
            </div>
           
        </Container>
    );
}