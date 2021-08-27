import pkg from "sequelize"
const { QueryTypes, Sequelize } = pkg

const { PGDATABASE, PGUSERNAME, PGPASSWORD, PGHOST, PGPORT } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSERNAME, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export const initSequelize = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.query(schemas, { type: QueryTypes.SELECT})
    await sequelize.sync({logging: false})
    console.log("DB Initialized")
  } catch (error) {
    console.log(error)
  }
}



export default sequelize
