import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import mongoose from "mongoose"
import expenseRouter from "./routes/expenses.js"

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("connected to database"))

app.use(express.json())

app.use("/expenses", expenseRouter)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
