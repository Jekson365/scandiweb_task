import { useEffect, useState } from "react";
import PageTitle from "../../components/headers/PageTitle";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";

export const Homepage = () => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState<string | null>("");
  useEffect(() => {
    setLocation(searchParams.get("query"));
  }, []);
  return (
    <>
      <div className="gap"></div>
      <PageTitle title={location} />
      <ProductList />
    </>
  );
};
