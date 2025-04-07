import { useTodoContext } from "../context/todoContext"

const PriorityFilter = () => {
  const { priorityFilter, setPriorityFilter } = useTodoContext()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="font-semibold">Filtrar por prioridad:</label>
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value as any)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="all">Todas</option>
        <option value="Alta">Alta</option>
        <option value="Média">Media</option>
        <option value="Baixa">Baja</option>
      </select>
    </div>
  )
}

export default PriorityFilter