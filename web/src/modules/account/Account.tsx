import { gql } from "apollo-boost";
import * as React from "react";
import { PureComponent } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { MeQuery } from "../../schemaTypes";
import SubscribeUser from "./SubscribeUser";

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
      type
    }
  }
`;

export default class Account extends PureComponent {
  render() {
    return (
      // fetchPolicy ignore caching and goes directly to server each time
      <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>Data is Undefined</div>;
          }
          if (!data.me) {
            return <Link to="/login">Please Login</Link>;
          }

          if (data.me.type === "free-trial") {
            return <SubscribeUser />;
          }

          //   if (data.me.type === 'paid')
          return <div>Thank you and come again!</div>;
        }}
      </Query>
    );
  }
}
