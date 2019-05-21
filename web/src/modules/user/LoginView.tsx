import { gql } from "apollo-boost";
import * as React from "react";
import { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { userFragment } from "../../graphql/fragments/userFragment";
import { meQuery } from "../../graphql/queries/me";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { Input } from "../../ui/Input";
import { RedButton } from "../../ui/RedButton";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export default class LoginView extends PureComponent<RouteComponentProps<{}>> {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { password, email } = this.state;
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          // handles login
          if (!data || !data.login) {
            return;
          }
          cache.writeQuery({
            query: meQuery,
            data: { me: data.login }
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, { client }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <Input
                label="EMAIL"
                type="text"
                name="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={this.handleChange}
              />
              <Input
                label="PASSWORD"
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={password}
                onChange={this.handleChange}
              />
              <RedButton
                onClick={async () => {
                  // optional reset cache
                  await client.resetStore();
                  const response = await mutate({
                    // this.state -> works in place of { email, password }
                    variables: { email, password }
                  });
                  console.log(response);
                  this.props.history.push("/account");
                }}
              >
                Login
              </RedButton>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
