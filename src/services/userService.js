const { AppDataSource } = require("../config/pgsql")
const userEntity = require("../entities/userEntity")
const userRepo = AppDataSource.getRepository(userEntity);
const bcrypt = require('bcrypt');

const createUserService = async (payload) => {
  payload['password'] = await bcrypt.hash(payload.password, 10);
  const created = userRepo.create(payload);
  const result = await userRepo.save(created);
  return result;
};

const findOneUserService = async (filter) => {
  const result = await userRepo.findOne({ where: filter });
  return result;
};

const updateUserService = async (filter, payload) => {
  const existingUser = await userRepo.findOne({ where: filter });
  if (!existingUser) throw new Error("User not found");
  const update = await userRepo.update(filter, payload);
  return update
};

module.exports = {
  createUserService,
  findOneUserService,
  updateUserService
}