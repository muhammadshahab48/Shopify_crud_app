const producstServie = require("../services/productService")
const { createProductValidation, updateProductValidation } = require("../schema/productSchema");
const { STATUS_CODES } = require("../utils/constants");

const createProductHandler = async (req, res) => {
  try {
    const productData = req?.body ?? {};
    const { error } = createProductValidation.validate(productData);
    if (error) return res.status(STATUS_CODES.ERROR.VALIDATION_ERROR).send({
      status: false,
      message: error.message
    });
    const product = await producstServie.createProductService(productData)
    return res.status(STATUS_CODES.SUCCESS.CREATED).send({
      status: true,
      message: "Product has been added",
      data: product
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const getAllProductHandler = async (req, res) => {
  try {
    const products = await producstServie.findAllProductsService();
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "All Products fetched Successfully",
      data: products
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const getOneProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await producstServie.findOneProductsService({ id });
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "Products fetched Successfully",
      data: product
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const productPayload = req?.body ?? {};
    const { error } = updateProductValidation.validate(productPayload);
    if (error) return res.status(STATUS_CODES.ERROR.VALIDATION_ERROR).send({
      status: false,
      message: error.message
    })
    const product = await producstServie.updateProductsService({ id }, productPayload);
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "Products updated Successfully",
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await producstServie.deleteProductsService({ id });
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "Products deleted Successfully"
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getOneProductHandler,
  updateProductHandler,
  deleteProductHandler
}
