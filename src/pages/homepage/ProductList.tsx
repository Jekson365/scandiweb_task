import ProductCard from "../../components/cards/ProductCard";
import { Product } from "../../types/types";
import { useQuery } from "@apollo/client";
import {
  GET_PROD_BY_CAT,
} from "../../graphql/queries/productQueires";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams] = useSearchParams()
  const { loading, data } = useQuery(GET_PROD_BY_CAT,{
    variables: { cat: searchParams.get("query") }
  });
  useEffect(()=> {
    console.log(data)
  },[data])
  return (
    <>
      <div className="product-list-cover">
        {loading ? (
          <>loading...</>
        ) : (
          <>
            {data &&
              data.productsByCat.map((e: Product) => {
                return (
                  <>
                    <ProductCard item={e} />
                  </>
                );
              })}
          </>
        )}
      </div>
    </>
  );
}

export default ProductList;
