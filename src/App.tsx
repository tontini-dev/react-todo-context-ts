import { TodoProvider } from './context/TodoContext'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
        <Header />
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App