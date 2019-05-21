import { gql } from "apollo-boost";
import * as React from "react";
import { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { userFragment } from "../../graphql/fragments/userFragment";
import { meQuery } from "../../graphql/queries/me";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import Form from "./Form";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export default class LoginView extends PureComponent<RouteComponentProps<{}>> {
  render() {
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
          <Form
            buttonText="login"
            onSubmit={async data => {
              // optional reset cache
              await client.resetStore();
              const response = await mutate({
                variables: data
              });
              console.log(response);
              this.props.history.push("/account");
            }}
          />
        )}
      </Mutation>
    );
  }
}
