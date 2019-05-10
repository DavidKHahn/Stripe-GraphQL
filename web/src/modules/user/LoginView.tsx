import { gql } from "apollo-boost";
import * as React from "react";
import { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from 'react-router';
import { LoginMutation, LoginMutationVariables } from '../../schemaTypes';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
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
                mutation={loginMutation}>
        {mutate => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button onClick={async () => {
                const response = await mutate({
                  // this.state -> works in place of { email, password }
                  variables: { email, password }
                });
                console.log(response);
                this.props.history.push("/me");
              }}
                >Login</button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}