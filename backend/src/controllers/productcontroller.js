const products = require("../data/products");

function getProducts(req, res) {
  const activeProducts = products.filter((product) => product.active);

  return res.status(200).json({
    success: true,
    count: activeProducts.length,
    data: activeProducts
  });
}

function getProductById(req, res, next) {
  const productId = Number(req.params.id);

  if (!Number.isInteger(productId) || productId <= 0) {
    const error = new Error("Product ID must be a positive integer.");
    error.statusCode = 400;
    return next(error);
  }

  const product = products.find(
    (item) => item.id === productId && item.active
  );

  if (!product) {
    const error = new Error(
      `Active product with ID ${productId} was not found.`
    );

    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).json({
    success: true,
    data: product
  });
}

module.exports = {
  getProducts,
  getProductById
};