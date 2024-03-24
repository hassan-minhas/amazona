import React from "react";
import { useEffect, useReducer } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../../Product";
import LoadingBox from "../../LoadingBox";
import MessageBox from "../../MessageBox";

const trendingProducts = [
  {
    id: 1,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  // More products...
];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "FETCH_SELLER_REQUEST":
      return { ...state, loadingSellers: true };
    case "FETCH_SELLER_SUCCESS":
      return { ...state, sellers: action.payload, loadingSellers: false };
    case "FETCH_SELLER_FAIL":
      return { ...state, error: action.payload, loadingSellers: false };

    default:
      return state;
  }
};

export const StoreFrontProducts = () => {
  const [{ loading, error, products, loadingSellers, sellers }, dispatch] =
    useReducer(logger(reducer), {
      products: [],
      sellers: [],
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });

        dispatch({ type: "FETCH_SELLER_REQUEST" });
        const sellers = await axios.get("/api/users/top-sellers");
        dispatch({ type: "FETCH_SELLER_SUCCESS", payload: sellers.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
        dispatch({ type: "FETCH_SELLER_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col gap-10">
        <div className="md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-4xl font-bold text-gray-700"
          >
            Trending Products
          </h2>
          <a
            href="#"
            className="hidden text-sm font-medium text-orange-600 hover:text-orange-600 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col xs={6} md={4} lg={3} key={product.slug} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};
