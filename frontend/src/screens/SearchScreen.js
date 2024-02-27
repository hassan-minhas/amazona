import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <div className="flex">
        <div className="w-1/4">
          <h3 className="text-lg font-semibold mb-2">Department</h3>
          <ul>
            <li>
              <Link
                className={`block ${category === "all" && "font-semibold"}`}
                to={getFilterUrl({ category: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={`block ${category === c && "font-semibold"}`}
                  to={getFilterUrl({ category: c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4">Price</h3>
          <ul>
            <li>
              <Link
                className={`block ${price === "all" && "font-semibold"}`}
                to={getFilterUrl({ price: "all" })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={`block ${price === p.value && "font-semibold"}`}
                  to={getFilterUrl({ price: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4">Avg. Customer Review</h3>
          <ul>
            {ratings.map((r) => (
              <li key={r.name}>
                <Link
                  className={`block ${
                    rating === r.rating.toString() && "font-semibold"
                  }`}
                  to={getFilterUrl({ rating: r.rating })}
                >
                  <Rating caption={" & up"} rating={r.rating}></Rating>
                </Link>
              </li>
            ))}
            <li>
              <Link
                className={`block ${rating === "all" && "font-semibold"}`}
                to={getFilterUrl({ rating: "all" })}
              >
                <Rating caption={" & up"} rating={0}></Rating>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-3/4 pl-4">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <div>
                  {countProducts === 0 ? "No" : countProducts} Results
                  {query !== "all" && `: ${query}`}
                  {category !== "all" && `: ${category}`}
                  {price !== "all" && `: Price ${price}`}
                  {rating !== "all" && `: Rating ${rating} & up`}
                  {(query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all") && (
                    <button
                      className="ml-2 bg-gray-200 px-2 py-1 rounded-md"
                      onClick={() => navigate("/search")}
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                  )}
                </div>
                <div className="text-right">
                  Sort by{" "}
                  <select
                    className="border rounded-md p-1"
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </div>
              </div>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <div className="flex flex-wrap">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 px-2"
                  >
                    <Product product={product}></Product>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                    className={`mx-1 ${
                      Number(page) === x + 1 ? "font-semibold" : ""
                    }`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
