import React from 'react'
import {useRouteError} from 'react-router-dom'
function ErrorElement() {
    let error=useRouteError()
  return (
    <div>
        <h3 className='text-warning fw-bold'>{error.statusText}</h3>
    </div>
  )
}

export default ErrorElement