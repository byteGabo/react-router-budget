import { redirect } from "react-router-dom";

import { toast } from "react-toastify";

import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({params}){
    console.log(params)
   try{
    deleteItem({
        key: "budgets",
        id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    associatedExpenses.forEach((expense) => {
        deleteItem({
            key:"expenses",
            id: expense.id
        })
    });
    toast.success("Presupuesto borrado!")
   
}catch(e){
    throw new Error("Hubo un problema al borrar tu presupuesto.")
   }

   return redirect("/")

}