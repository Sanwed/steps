import {Task} from "../interfaces/interfaces.ts";
import {MouseEvent} from "react";

interface TasksProps {
  tasks: Task[],
  onDelete: (evt: MouseEvent<HTMLButtonElement>) => void
  onEdit: (evt: MouseEvent<HTMLButtonElement>) => void
}

function Tasks({tasks, onDelete, onEdit}: TasksProps) {
  return (
    <table>
      <thead className='mb-5'>
      <tr>
        <th className='p-3'>Дата (ДД.ММ.ГГГГ)</th>
        <th className='p-3'>Пройдено км</th>
        <th className='p-3'>Действия</th>
      </tr>
      </thead>
      <tbody className='text-center border border-black'>
      {tasks && tasks.map((task) => (
        <tr key={task.id} id={task.id} className='task'>
          <td className='p-3'>{task.date}</td>
          <td>{task.distance}</td>
          <td>
            <button onClick={onEdit} className='mr-2'>✏️</button>
            <button onClick={onDelete}>❌</button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Tasks
