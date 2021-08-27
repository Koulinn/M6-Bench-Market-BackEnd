import sequelize from "../conn.js"
import s from "sequelize"
const { DataTypes } = s

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_day: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
  {
    timestamps: false
  }
)

export default User
