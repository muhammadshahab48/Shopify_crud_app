const { EntitySchema } = require("typeorm");

const userEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "uuid",
      unique: true,
      primary: true,
      default: () => "gen_random_uuid()"
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    }
  }
})

module.exports = userEntity