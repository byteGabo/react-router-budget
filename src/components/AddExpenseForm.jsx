import { useFetcher } from "react-router-dom";
import { useRef, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmitting){
        //clear form
        formRef.current.reset()
        //reset focus
        focusRef.current.focus()
    }
  
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Agrega un nuevo gasto {" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Nombre del Gasto</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="ej. Cafe"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Cantidad Gastada</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="ej. 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Categoría</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
                {
                   budgets.sort((a,b) => a.createdAt - b.createdAt)
                   .map((budget) => {
                    return(
                        <option key={budget.id} value={budget.id}>
                        {budget.name}
                        </option>
                    )
                   }) 
                }
            </select>
        </div>
        <input type="hidden" name="_action" value="createExpense"/>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} >
                {
                    isSubmitting ? <span>Creado presupuesto...</span> : (
                        <>
                        <span>Crear gasto</span>
                        <PlusCircleIcon width={20}/>
                        </>
                    )
                }
            </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
