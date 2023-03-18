// react router imports
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
//helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("El presupuesto que trata de buscar no existe");
  }
  return { budget, expenses };
}

//action
export async function budgetAction({ request }){
    const data = await request.formData();
    const { _action, ...values} = Object.fromEntries(data);


    if (_action == "createExpense") {
        try {
          //create an expense
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget,
          });
    
          return toast.success(`Gasto ${values.newExpense} creado!`);
        } catch (e) {
          throw new Error("Hubo un problema al crear tu gasto.");
        }
      }
  
    if (_action == "deleteExpense") {
      try {
        //create an expense
        deleteItem({
          key: "expenses",
          id: values.expenseId,
        });
  
        return toast.success(`Gasto borrado!`);
      } catch (e) {
        throw new Error("Hubo un problema al borrar tu gasto.");
      }
    }
  }

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg" style={{
        "--accent" : budget.color,
    }}>
      <h1 className="h2">
        Vista <span className="accent">{budget.name}</span> 
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            Gastos <span className="accent">{budget.name}</span>
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
