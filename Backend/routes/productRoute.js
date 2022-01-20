const express = require("express");
const { getAllProducts,
        createProduct,
        updateProduct,
        deleteProdut,
        getProductDetails, 
        createProductReview,
        getProductReviews,
        deleteReview,
        getAdminProducts,
       getCatProducts
    } 
    = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin") ,createProduct);
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin") ,updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin") ,deleteProdut);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/products/categories").get(getCatProducts);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
