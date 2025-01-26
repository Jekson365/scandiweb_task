import { gql } from "@apollo/client";

export const ADD_CART_ITEM = gql`
  mutation createUser($items: [CartItemInput!]!) {
    addCart(items: $items) {
      product_id
      price_id
      item_id
    }
  }
`;
