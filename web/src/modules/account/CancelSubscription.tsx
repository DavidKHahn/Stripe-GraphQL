import { gql } from 'apollo-boost';
import * as React from 'react';
import { userFragment } from '../../graphql/fragments/userFragment';

const cancelSubscriptionMutation = gql`
    mutation CancelSubscriptionMutation {
        cancelSubscription {
            ...UserInfo
        }
    }

    ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
  render() {
    return <div onClick={}>Cancel Subscription</div>;
  }
}
