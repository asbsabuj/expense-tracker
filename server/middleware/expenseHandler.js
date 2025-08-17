import { StatusCodes } from "http-status-codes"
import Expense from "../models/expense.js"

export const getExpenseById = async (req, res, next) => {
  let expense
  try {
    expense = await Expense.findById(req.params.id)

    if (expense == null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Expense not found!" })
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
  res.expense = expense
  next()
}

export const deleteExpense = async (req, res, next) => {
  const { id } = req.params

  const expense = await Expense.findOne({ _id: id })

  try {
    if (!expense) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Expense not found!" })
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
