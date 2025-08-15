import express from "express"
import Expense from "../models/expense.js"
import { StatusCodes } from "http-status-codes"

const router = express.Router()

//add a new expense
router.post("/", (req, res) => {})

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
router.get("/:id", (req, res) => {
  res.send(req.params.id)
})

//update an expense
router.patch("/:id", (req, res) => {
  res.send(req.params.id)
})

//delete an expense
router.delete("/:id", (req, res) => {})

export default router
