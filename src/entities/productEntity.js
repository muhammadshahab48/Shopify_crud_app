const { EntitySchema } = require("typeorm");

const   productEntity = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: "uuid",
      unique: true,
      primary: true,
      default: () => "gen_random_uuid()"
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "varchar"
    },
    price: {
      type: "money"
    },
    dicount: {
      type: "decimal",
      default: 0
    }
  }
})

module.exports = productEntity