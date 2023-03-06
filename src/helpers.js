
export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));


//color
const generateRandomColor = () => {
    const existengBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existengBudgetsLength * 34} 65% 50%`
}

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};


//create budget
export const createBudget = ({
    name, amount
})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existengBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...existengBudgets,newItem]))
}

//create expense
export const createExpense = ({
    name, amount, budgetId
})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existengExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses", JSON.stringify([...existengExpenses,newItem]))
}

//delete item 
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        //check if expense.id === budgetId i passed in
        if(expense.budgetId != budgetId) return acc

        //add the current amount to my total
        return acc += expense.amount

    }, 0)
    return budgetSpent; 
}


//formatting
export const formatDateToLocalString = (epoch) => new Date(epoch).toLocaleDateString();

//formattin percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}


//format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency : "GTQ"
    })
}