import { Form, useFetcher } from "react-router-dom"
import { useRef, useEffect} from "react";

import {CurrencyDollarIcon} from "@heroicons/react/24/solid"


const AddBudgetForm = () => {
   const fetcher = useFetcher();
   const isSubmitting = fetcher.state === "submitting"

   const formRef = useRef()
   const focusRef = useRef()

   useEffect(() => {
    if(!isSubmitting){
        formRef.current.reset()
        focusRef.current.focus()
    }
   }, [isSubmitting])

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Crear presupuesto
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newBudget">Nombre del Presupuesto</label>
                <input type="text" name="newBudget" id="newBudger" placeholder="ej. Gastos de supermercado" required ref={focusRef}/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Cantidad a gastar</label>
                <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="ej. 600.00" required inputMode="decimal"/>
            </div>
            <input type="hidden" name="_action" value="createBudget"/>
            <button type="submit" className="btn btn--dark" disabled={isSubmitting} >
                {
                    isSubmitting ? <span>Creado presupuesto...</span> : (
                        <>
                        <span>Crear categoría</span>
                        <CurrencyDollarIcon width={20}/>
                        </>
                    )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm