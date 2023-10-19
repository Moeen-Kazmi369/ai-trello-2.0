import React from 'react'
import {BiUserCircle} from "react-icons/bi"
const Chatgpt = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='bg-white border px-3 py-2 rounded-md h-auto sm:max-w-[60vw] w-[90%] shadow-xl'>
        <p className='text-black text-sm h-auto w-full'>
            <BiUserCircle className='w-8 h-8 inline-block mr-1'/>
            Chatgpt summarizing your tasks.....
        </p>
    </div>
    </div>
  )
}

export default Chatgpt;