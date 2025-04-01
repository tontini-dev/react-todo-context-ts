import { createContext, useContext, useEffect, useState } from "react"
import { Todo } from "../types/todo"

type Filter = "all" | "completed" | "pending"

interface TodoContextProps {
    todos: Todo[]
    filteredTodos: Todo[]
    filter: Filter
    toggleTodo: (id: number) => void
    deleteTodo: (id: number) => void
    setFilter: (filter: Filter) => void
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>> // 🔥 add isso
    darkMode: boolean
    toggleTheme: () => void
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>("all")
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    const fetchTodos = async () => {
      const local = localStorage.getItem("todos")
      if (local) {
        setTodos(JSON.parse(local))
      } else {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        const data = await res.json()
        setTodos(data)
        localStorage.setItem("todos", JSON.stringify(data))
      }
    }
    fetchTodos()
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  return (
    <TodoContext.Provider value={{ todos, filteredTodos, filter, toggleTodo, deleteTodo, setFilter, setTodos, darkMode, toggleTheme }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) throw new Error("useTodoContext must be used inside a TodoProvider")
  return context
}