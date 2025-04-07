export type Priority = 'Alta' | 'Média' | 'Baixa'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
  priority: Priority
}