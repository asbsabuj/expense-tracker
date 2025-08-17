import express from "express"
import Expense from "../models/expense.js"
import { StatusCodes } from "http-status-codes"
import { getExpenseById, deleteExpense } from "../middleware/expenseHandler.js"

const router = express.Router()

//add a new expense
router.post("/", async (req, res) => {
  const expenses = await new Expense({
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
  })

  try {
    const newExpenses = await expenses.save()
    res.status(StatusCodes.CREATED).json(newExpenses)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
})

//fetch all expense
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find()
    res.json(expenses)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
  }
})

//fetch one expense
router.get("/:id", getExpenseById, (req, res) => {
  res.json(res.expense.title)
})

//update an expense
router.patch("/:id", getExpenseById, async (req, res) => {
  if (req.body.title != null) {
    res.expense.title = req.body.title
  }

  if (req.body.amount != null) {
    res.expense.amount = req.body.amount
  }

  if (req.body.date != null) {
    res.expense.date = req.body.date
  }

  if (req.body.category != null) {
    res.expense.category = req.body.category
  }
  try {
    const updatedExpense = await res.expense.save()
    res.json(updatedExpense)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST)
  }
})

//delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id)
    if (!expense) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Expense not found" })
    }
    res.json({ message: "Expense deleted successfully" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
})

export default router
