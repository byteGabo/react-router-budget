import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Layouts
import Main, { MainLoader } from "./layouts/Main";

//library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import Dashboard, { dashboardAction, dashboarLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

//actions
import { logoutAction } from "./actions/logout";



const router = createBrowserRouter([
  {
    path:"/",
    element: <Main/>,
    loader: MainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboarLoader,
        action: dashboardAction,
        errorElement: <Error/>
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error/>,
        action: budgetAction
        
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error/>
        
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },  
]);


function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
