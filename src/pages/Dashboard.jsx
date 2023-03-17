// react router imports
import { Link, useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";

//components
import Intro from "../components/Intro";
import Table from "../components/Table";

//Helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";

//loader
export function dashboarLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action == "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Bienvenido ${values.userName}`);
    } catch {
      throw new Error("Hubo un error a crear tu cuenta.");
    }
  }

  if (_action == "createBudget") {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });

      return toast.success("Categoría Creada");
    } catch (e) {
      throw new Error("Hubo un problema al crear tu categoria.");
    }

    
  }

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
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Bienvenido, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Presupuestos actuales</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Gastos Recientes</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createAt - a.createAt
                      )
                      .slice(0,8)
                    }
                    />
                    {expenses.length > 8 && (
                      <Link 
                      to="expenses"
                      className="btn btn--dark">
                      Ver todos los gastos
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Manejar bien tu dinero es el secreto de la libertad financiera
                </p>
                <p>Crear un presupuesto para iniciar!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
