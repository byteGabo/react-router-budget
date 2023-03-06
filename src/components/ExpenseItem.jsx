import { formatCurrency, formatDateToLocalString } from "../helpers"

const ExpenseItem = ({expenses}) => {
  return (
    <>
    <td>{expenses.name}</td>
    <td>{formatCurrency(expenses.amount)}</td>
    <td>{formatDateToLocalString(expenses.createAt)}</td>
    </>
  )
}

export default ExpenseItem