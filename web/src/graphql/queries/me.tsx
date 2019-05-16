import { gql } from "apollo-boost";
import { userFragment } from '../fragments/UserFragment';

export const meQuery = gql`
  query MeQuery {
    me {
      ...UserInfo
    }
  }

  ${userFragment}
`;
