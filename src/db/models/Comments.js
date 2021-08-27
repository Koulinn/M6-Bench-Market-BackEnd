import sequelize from "../conn.js"
import s from "sequelize"
const { DataTypes } = s

const Comments = sequelize.define("comments",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false
  }
)

export default Comments
