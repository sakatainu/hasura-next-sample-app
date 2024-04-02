import { gql } from 'urql';

export const SelectGroups = gql`
  query SelectGroups($where: groups_bool_exp, $lang: languages_enum = ja) {
    groups(where: $where) {
      id
      name
      contract {
        expireAt
        maxUsers
        planCode
        startAt
        plan {
          planTranslations(where: { languageCode: { _eq: $lang } }) {
            text
          }
        }
      }
    }
  }
`;

export const InsertGroups = gql``;
