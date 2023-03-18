import ExpenseItem from "./ExpenseItem"

const Table = ({expenses, showBudget = true}) => {
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                {
                    ["Nombre", "Precio", "Fecha", showBudget ? "Presupuesto" : "", ""].map((i, index) => (
                        <th key={index}>{i}</th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expenses) => (
                        <tr key={expenses.id}>
                           <ExpenseItem expenses={expenses} showBudget={showBudget} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table