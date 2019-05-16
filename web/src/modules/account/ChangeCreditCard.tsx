import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import { ChangeCreditCardMutation, ChangeCreditCardMutationVariables } from "../../schemaTypes";

const changeCreditCardMutation = gql`
  mutation ChangeCreditCardMutation($source: String!) {
    changeCreditCard(source: $source) {
      id
      email
      type
    }
  }
`;

export default class SubscribeUser extends React.PureComponent {
  render() {
    return (
      <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}
      >
        {mutate => (
          <StripeCheckout
            token={async token => {
              const response = await mutate({
                variables: { source: token.id }
              });
              console.log(response);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
          />
        )}
      </Mutation>
    );
  }
}
