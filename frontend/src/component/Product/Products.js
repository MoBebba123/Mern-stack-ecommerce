import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct, listProductCategories } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Pagination from "react-js-pagination";


const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState("");
  const alert = useAlert();

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  let count = filteredProductsCount;
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings,));


  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          {
            category ? (
              <h2 className="productsHeading">category {'>'} {category}</h2>
              ) : (
              <h2 className="productsHeading">All Products</h2>
              )}


          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2500}
            />
            <Typography>Categories</Typography>

            <ul className="categoryBox">
              <li className="category-link"
                value=''
                onClick={(e) => setCategory(e.target.value)}
              >
                all
              </li>
              {categories && categories.map((category, index) => (
                <li
                  className="category-link"
                  key={index}
                  value={category}
                  onClick={() => {
                    setCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend"> Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

          </div>


          <div className="paginationBox">
            {resultPerPage < count &&
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />}
          </div>
        </Fragment>)
      }

    </Fragment>
  )
}

export default Products
