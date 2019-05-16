import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { meQuery } from "../graphql/queries/me";
import { MeQuery } from "../schemaTypes";

export default class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#fafafa",
          display: "flex",
          justifyContent: "space-around",
          padding: 10
        }}
      >
        <Link to="/">
          <h2>Striple Example</h2>
        </Link>
        <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }

            if (!data.me) {
              return (
                <div>
                  <div>
                    <Link to="/login">Login</Link>
                  </div>
                  <div>
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              );
            }

            // user is logged in

            return (
                <div>
                    <Link to="/account">Account</Link>
                </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
