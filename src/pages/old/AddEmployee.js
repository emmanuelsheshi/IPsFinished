import React from 'react'
import { useState } from 'react'
import { useForm, useController } from 'react-hook-form'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.css'
import {
  employment_status_options,
  departments,
  construction_site_staff,
} from './selectData'

let department = ''

const AddEmployeeComponent = ({ onSave, user = {} }) => {
  const { register, control, handleSubmit } = useForm({ defaultValues: user })

  const { field } = useController({ name: 'employment_status', control })

  const [dept, setDept] = useState()

  const handleSave = (fromValues) => {
    console.log(fromValues)
  }

  const handleSelectChange = (option) => {
    const ans = field.onChange(option.value)
  }

  const handleChange = () => {
    console.log('change here')
  }

  const handleDepartmentChange = (option) => {
    console.log(option)
  }

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit(handleSave)}>
        <div id="content1">
          <div>
            <p>first name</p>
            <input type="text" {...register('firstname')} />
          </div>

          <div>
            <p>surname</p>
            <input type="text" name="surname" {...register('surname')} />
          </div>

          <div>
            <p>phone</p>
            <input type="text" name="phone" {...register('phone')} />
          </div>

          <div>
            <p>address</p>
            <input type="text" name="address" {...register('address')} />
          </div>
        </div>

        <div className="content2">
          <p>Employment status</p>
          <Select
            {...register('employment_status')}
            onChange={handleSelectChange}
            options={employment_status_options}
          />

          <p>Department</p>
          <Select
            {...register('departments')}
            onChange={(choice) => choice.value}
            value={dept}
            options={departments}
          />

          <p>Section</p>
          <Select
            {...register('section')}
            options={construction_site_staff}

            // onChange={}
          />
        </div>
        <input type="submit" value="save" />
      </form>
    </div>
  )
}

export default AddEmployeeComponent
