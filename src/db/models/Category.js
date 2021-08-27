import sequelize from "../conn.js"
import s from "sequelize"
const { DataTypes } = s

const Category = sequelize.define("category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false
  }

)

export default Category
