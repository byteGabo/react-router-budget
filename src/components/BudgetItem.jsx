import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline"

const BudgetItem = ({budget, showDelete = false}) => {
    const {id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{
        "--accent": color
    }}>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)}</p>
        </div>
        <progress value={spent} max={amount}>
            {formatPercentage(spent/amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}</small>
            <small>{formatCurrency(amount - spent)}</small>
        </div>
        {
            showDelete ? (
                <div className="flex-sm">
                <Form method="post"
                action="delete"
                onSubmit={(event) => {
                    if(!confirm("Esta seguro que desea borrar todo el presupuesto y sus gastos?")){
                        event.preventDefault();
                    }
                }}>
                 <button type="submit" className="btn">
                    <span>Borrar Presupuesto</span>
                    <TrashIcon width={20} />
                 </button>
                </Form>
                </div>
            ) : (
             <div className="flex-sm">
                 <Link
                to={`/budget/${id}`}
                className="btn">
                <span>Ver detalles</span>
                <BanknotesIcon width={20} />
                </Link>
             </div>
            )
        }
    </div>
  )
}

export default BudgetItem