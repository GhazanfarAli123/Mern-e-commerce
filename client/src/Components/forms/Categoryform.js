import React from 'react'

const Categoryform = ({ handelSubmit, setValue, value }) => {
  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  )
}

export default Categoryform
