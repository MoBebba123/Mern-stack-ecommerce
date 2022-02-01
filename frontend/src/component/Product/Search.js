import React, { useState, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  const OnSuggestionHandler = (keyword) => {
    setKeyword(keyword);
    setSuggestions([]);
  }
  const ChangeHandler = (keyword) => {
    let matches = []
    if (keyword.length > 0) {
      matches = products.filter(product => {
        const regex = new RegExp(`${keyword}`, "gi");
        return product.name.match(regex);
      })
    }
    setSuggestions(matches)
    setKeyword(keyword);

  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Search A Product -- ECOMMERCE" />
          <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search a Product ..."
              value={keyword}
              onChange={(e) => ChangeHandler(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 100)
              }}
            />
            <input type="submit" value="Search" />
            {suggestions && suggestions.map((suggestion, i) => (
              <div className="suggestion">

                <div key={i} onClick={() => OnSuggestionHandler(suggestion.name)}> {suggestion.name} </div>
              </div>
            ))}
          </form>

        </Fragment>
      )
      }
    </Fragment>

  );
};

export default Search;
