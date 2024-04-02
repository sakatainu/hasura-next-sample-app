import { gql } from 'urql';

export const InsertGroup = gql`
  mutation InsertGroup($object: groups_insert_input!) {
    insert_groups_one(object: $object) {
      id
    }
  }
`;

export const InsertGroups = gql``;
