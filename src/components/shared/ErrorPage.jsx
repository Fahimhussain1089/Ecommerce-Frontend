import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'


const ErrorPage = ({message }) => {

  return (
    <div className='flex flex-col items-center justify-center px-6 py-14'>
        <FaExclamationTriangle className='text-red-500 text-6xl mb-4' />
       <div className='text-gray-600 mb-6 text-center '>
         {message ? message : "An Unexpected error has occured "}
      </div>
    </div>
  )
}

export default ErrorPage;
