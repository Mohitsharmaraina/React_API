import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function ApiHandler() {
  //const { products, error, loading } = customQuery("/api/products"); // for custom method call

  const [products, setProducts] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    {
      /* to prevent multiple calls "debounce" is used*/
    }
    // to prevent race conditions AbortController() of axios is used(output of api requests will be in sequence)
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(
          ` http://localhost:4500/api/products?search=${search}`,
          {
            signal: controller.signal,
          }
        );
        // console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        // this error is thrown by AbortController and must be handled in catch block
        if (axios.isCancel(error)) {
          console.log("request canceled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
    // cleanup
    return () => {
      controller.abort();
    };
  }, [search]);
  console.log(search);
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (error) {
  //   return <h1>Something went wrong!</h1>;
  // }

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong!</h1>}
      <input
        type="text"
        placeholder="Search product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>No. of proudcts: {products.length}</h1>
    </>
  );
}

export default ApiHandler;

// custom method for api call
/*const customQuery = (url) => {
  const [products, setProducts] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(url);
        // console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);
  return { products, error, loading };
};
*/
