import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

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

  const ChangeHandler = (keyword) => {
    let matches = []
    if(text.length > 0){
      matches = products.filter(product =>{
        const regex = new RegExp(`${text}`, "gi");
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
              onChange={(e)=> ChangeHandler(e.target.value)}
            />
            <input type="submit" value="Search" />
            {suggestions && suggestions.map((suggestion,i)=>(
              <div key={i} className="suggestion"> {suggestion.name} </div>
            ))}
          </form>
        </Fragment>
      )
      }
    </Fragment>

  );
};

export default Search;
