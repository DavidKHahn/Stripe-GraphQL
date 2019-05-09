import { gql } from "apollo-boost";
import * as React from "react";
import { PureComponent } from "react";
import { Query } from "react-apollo";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

export default class MeView extends PureComponent {
  render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data) {
            return <div>Data is Undefined</div>;
          }
          if (!data.me) {
            return <div>Received No Uuser</div>;
          }

          return <div>{data.me.email}</div>;
        }}
      </Query>
    );
  }
}
