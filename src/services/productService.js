const { AppDataSource } = require("../config/pgsql")
const productEntity = require("../entities/productEntity")
const productRepo = AppDataSource.getRepository(productEntity);

const createProductService = async (payload) => {
  const created = productRepo.create(payload);
  const result = await productRepo.save(created);
  return result;
};

const findAllProductsService = async () => {
  const result = await productRepo.find();
  return result;
};

const findOneProductsService = async (filter) => {
  const result = await productRepo.findOne({ where: filter });
  return result;
};

const updateProductsService = async (filter, payload) => {
  const existingProduct = await productRepo.findOne({ where: filter });
  if (!existingProduct) throw new Error("Product not found"); 
  const update = await productRepo.update(filter, payload);
  return update
};

const deleteProductsService = async (filter) => {
  const existingProduct = await productRepo.findOne({ where: filter });
  if (!existingProduct) throw new Error("Product not found");
  await productRepo.delete(existingProduct.id);
};

module.exports = {
  createProductService,
  findAllProductsService,
  findOneProductsService,
  updateProductsService,
  deleteProductsService
}