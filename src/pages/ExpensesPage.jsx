import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";

//loader
export function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses };
  }

//action 
export async function expensesAction({ request }){
  const data = await request.formData();
  const { _action, ...values} = Object.fromEntries(data);

  if (_action == "deleteExpense") {
    try {
      //create an expense
      deleteItem({
        key: "expenses",
        id: values.expensesId,
      });

      return toast.success(`Gasto borrado!`);
    } catch (e) {
      throw new Error("Hubo un problema al borrar tu gasto.");
    }
  }
}  

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
        <h1>Todos los gastos</h1>
        {
            expenses && expenses.length > 0 
            ?(
                <div className="grid-md">
                    <h2>Gastos Recientes <small>({expenses.length} total)</small></h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>No hay gastos que mostrar</p>
            )
        }
    </div>
  )
}

export default ExpensesPage