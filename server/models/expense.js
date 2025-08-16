import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "Title must have at least 3 characters"],
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be a number greater than 0"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    default: "Personal Expenses",
  },
})

export default mongoose.model("Expense", expenseSchema)
