import {FormValues} from "../interfaces/interfaces.ts";
import {ChangeEvent, FormEvent} from "react";

interface FormProps {
  values: FormValues
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (evt:FormEvent<HTMLFormElement>) => void
}

function Form({values, onChange, onSubmit}: FormProps) {
  const datePattern = "^([0-2][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(\\d{4})$"
  const distancePattern = "^(\\d{1,2}|\\d{1,2}\\.\\d{1,2})$";

  return (
    <form onSubmit={onSubmit} className='flex gap-5'>
      <label className='max-w-40 flex flex-col justify-between'>
        <span className='block mb-2'>Дата (ДД.ММ.ГГГГ)</span>
        <input
          type="text"
          onChange={onChange}
          name='date'
          pattern={datePattern}
          value={values.date}
          className='w-full p-3 rounded-xl border border-black block'
          required
        />
      </label>
      <label className='max-w-40 flex flex-col justify-between'>
        <span>Пройдено км</span>
        <input
          type="text"
          onChange={onChange}
          name='distance'
          pattern={distancePattern}
          value={values.distance}
          maxLength={5}
          className='w-full p-3 rounded-xl border border-black block'
          required
        />
      </label>
      <button type='submit' className='self-end rounded-xl border border-black block p-3'>OK</button>
    </form>
  )
}

export default Form
