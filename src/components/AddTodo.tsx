import { useState } from "react"
import { useTodoContext } from "../context/todoContext"
import { Priority } from "../types/todo"

const AddTodo = () => {
  const { addTodo } = useTodoContext()
  const [newTodo, setNewTodo] = useState("")
  const [priority, setPriority] = useState<Priority>("Média")

  const handleAdd = () => {
    if (!newTodo.trim()) return
    addTodo(newTodo, priority)
    setNewTodo("")
    setPriority("Média")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <input
        type="text"
        placeholder="Nova tarefa"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="Alta">Alta</option>
        <option value="Média">Media</option>
        <option value="Baixa">Baja</option>
      </select>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </div>
  )
}

export default AddTodo