import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      gallery
      inStock
      category {
        name
      }
      price {
        id
        amount
        currency {
          id
          label
          symbol
        }
      }
      attributes {
        name
        id_name
        type
        items {
          id
          value
          display_value
          id_name
        }
      }
    }
  }
`;

export const GET_PROD_BY_CAT = gql`
  query GetProdByCat ($cat: String!,$id: ID) {
    productsByCat(catName: $cat,id: $id) {
      id
      name
      inStock
      gallery
      category {
        name
      }
      gallery
      price {
        amount
        currency {
          id
          label
          symbol
        }
      }
      attributes {
        name
        id_name
        type
        items {
          id
          value
          display_value
          id_name
        }
      }
    }
  }
`;

export const GET_CURRENT_PRODUCT = gql`
  query GetCurrentProduct($id: ID!) {
    product(id: $id) {
      id
      name
      category {
        name
      }
      gallery
      price {
        id
        amount
        currency {
          id
          label
          symbol
        }
      }
      attributes {
        name
        id_name
        type
        items {
          id
          value
          display_value
          id_name
        }
      }
    }
  }
`;
