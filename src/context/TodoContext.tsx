import { createContext, useContext, useEffect, useState } from "react"
import { Todo, Priority } from "../types/todo"

type Filter = "all" | "completed" | "pending"
type PriorityFilter = "all" | Priority

interface TodoContextProps {
  todos: Todo[]
  filteredTodos: Todo[]
  filter: Filter
  priorityFilter: PriorityFilter
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  setFilter: (filter: Filter) => void
  setPriorityFilter: (priority: PriorityFilter) => void
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  addTodo: (title: string, priority: Priority) => void
  darkMode: boolean
  toggleTheme: () => void
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
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
        // Adiciona prioridade aleatória aos dados da API
        const prioritized = data.map((todo: any) => ({
          ...todo,
          priority: ["Alta", "Média", "Baixa"][Math.floor(Math.random() * 3)] as Priority
        }))
        setTodos(prioritized)
        localStorage.setItem("todos", JSON.stringify(prioritized))
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
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const addTodo = (title: string, priority: Priority) => {
    const newTodo: Todo = {
      userId: 1,
      id: todos.length + 1,
      title,
      completed: false,
      priority,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed
      if (filter === "pending") return !todo.completed
      return true
    })
    .filter((todo) => {
      if (priorityFilter === "all") return true
      return todo.priority === priorityFilter
    })

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filter,
        setFilter,
        priorityFilter,
        setPriorityFilter,
        toggleTodo,
        deleteTodo,
        setTodos,
        addTodo,
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context)
    throw new Error("useTodoContext must be used inside a TodoProvider")
  return context
}