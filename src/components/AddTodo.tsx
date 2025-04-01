import { useState } from "react"
import { useTodoContext } from "../context/TodoContext"
import toast from "react-hot-toast"

const AddTodo = () => {
  const [text, setText] = useState("")
  const { todos, setTodos, setFilter } = useTodoContext()

  const addTodo = () => {
    const trimmed = text.trim()
    if (!trimmed) return toast.error("Escribe una tarea válida")

    const newTodo = {
      userId: 1,
      id: Date.now(),
      title: trimmed,
      completed: false,
    }

    const updatedTodos = [newTodo, ...todos]
    setTodos(updatedTodos)
    setText("")
    setFilter("all")

    toast.success("¡Tarea añadida!")
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea..."
        className="flex-1 px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
      />
      <button
        onClick={addTodo}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Añadir
      </button>
    </div>
  )
}

export default AddTodo