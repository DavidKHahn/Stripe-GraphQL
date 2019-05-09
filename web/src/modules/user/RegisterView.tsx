import * as React from "react";
import { PureComponent } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { RegisterMutation, RegisterMutationVariables } from '../../schemaTypes';

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export default class RegisterView extends PureComponent {
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
      <Mutation<RegisterMutation, RegisterMutationVariables> 
                mutation={registerMutation}>
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
              <button onClick={() => console.log("hi")}>Register</button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
