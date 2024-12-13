import Form from "./Form.tsx";
import {ChangeEvent, FormEvent, MouseEvent, useState} from "react";
import {FormValues, Task} from "../interfaces/interfaces.ts";
import Tasks from "./Tasks.tsx";
import {generateId} from "../utils/utils.ts";

function Steps() {
  const [form, setForm] = useState<FormValues>({
    date: '',
    distance: ''
  })
  const [tasks, setTasks] = useState<Task[]>([])
  const [edit, setEdit] = useState<string | null>(null)

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      [evt.target.name]: evt.target.value
    }))
  }

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const sameDateTask = tasks.findIndex((task) => task.date === form.date)
    if (sameDateTask !== -1) {
      const tasksCopy = tasks.slice()
      tasksCopy[sameDateTask].distance = `${+tasksCopy[sameDateTask].distance + +form.distance}`
      setTasks(tasksCopy)
    } else {
      setTasks(prevState => [...prevState, {id: generateId(), date: form.date, distance: form.distance}])
    }
    setForm({date: '', distance: ''})
  }

  const onEditSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const sameTask = tasks.findIndex((task) => task.id === edit)
    if (sameTask !== -1) {
      const tasksCopy = tasks.slice()
      tasksCopy[sameTask] = {...tasksCopy[sameTask], ...form}
      setTasks(tasksCopy)
      setEdit(null)
      setForm({date: '', distance: ''})
    }
  }

  const onEdit = (evt: FormEvent<HTMLButtonElement>) => {
    const task = evt.currentTarget.closest('.task');
    if (task) {
      const id = task.id
      const taskData = tasks.find((task) => task.id === id)
      if (taskData) {
        setForm({date: taskData.date, distance: taskData.distance})
        setEdit(id)
      }
    }
  }

  const onDelete = (evt: MouseEvent<HTMLButtonElement>) => {
    const task = evt.currentTarget.closest('.task');
    if (task) {
      const id = task.id
      const taskIndex = tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1 && edit !== id) {
        setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)])
      }
    }
  }

  return (
    <div className='max-w-xl flex flex-col gap-5'>
      {edit && <b>Редактирование задачи</b>}
      <Form values={form} onChange={onChange} onSubmit={edit ? onEditSubmit : onSubmit} />
      <Tasks tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
    </div>
  )
}

export default Steps
