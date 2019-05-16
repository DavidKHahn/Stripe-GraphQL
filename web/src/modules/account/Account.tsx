import * as React from "react";
import { PureComponent } from "react";
import { Query } from "react-apollo";
import { Redirect } from 'react-router-dom';
import { meQuery } from '../../graphql/queries/me';
import { MeQuery } from "../../schemaTypes";
import { ChangeCreditCard } from './ChangeCreditCard';
import SubscribeUser from "./SubscribeUser";

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
            return <Redirect to="/login" />;
          }

          if (data.me.type === "free-trial") {
            return <SubscribeUser />;
          }

          //   if (data.me.type === 'paid')
          return <ChangeCreditCard />;
        }}
      </Query>
    );
  }
}
