import React from "react";
import { Menu } from "semantic-ui-react";
import {Link} from "../routes";

export default () => {
    return (
        <Menu>
            <Link route="/">
                <a className="item">
                    CrowdCoin
                </a>
            </Link>

            <Menu.Menu position="right">
                <Menu.Item>
                    crowdFunding
                </Menu.Item>
                <Link route="/crowdFunding/new">
                <a className="item">
                    +
                </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}
    