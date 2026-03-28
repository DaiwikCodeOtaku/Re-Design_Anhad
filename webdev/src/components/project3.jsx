import { useState } from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between rounded-2xl w-full'>
      <div className='w-20 bg-gray-900 rounded-2xl h-6'></div>
    </div>
  )
}

const Cards1 = ({ isActive }) => {
  return (
    <div className={`w-70 h-100 flex flex-col items-center rounded-2xl transition-all duration-500 ease-in-out
      ${isActive ? 'bg-teal-500 scale-110 shadow-2xl translate-y-0 opacity-100' : 'bg-teal-300 scale-90 opacity-60 translate-y-10'}`}>
      <Navbar />
      <div className='w-40 h-40 m-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'></div>
      <h1 className='text-xl font-bold'>How can I help</h1>
      <h1 className='text-xl font-bold'>you today?</h1>
    </div>
  )
}

const Cards2 = ({ isActive }) => {
  return (
    <div className={`w-70 h-100 flex flex-col justify-between items-center rounded-2xl p-4 transition-all duration-500 ease-in-out
      ${isActive ? 'bg-teal-500 scale-110 shadow-2xl translate-y-0 opacity-100' : 'bg-teal-300 scale-90 opacity-60 translate-y-10'}`}>
      <Navbar />
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>Hello Hitesh</h1>
        <h1 className='text-2xl font-bold'>How can I help</h1>
        <h1 className='text-2xl font-bold'>you today?</h1>
      </div>
      <div className='w-full'>
        <input type="text" placeholder='+ Ask anything...'
          className='w-full px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all' />
      </div>
    </div>
  )
}

const Cards3 = ({ isActive }) => {
  return (
    <div className={`w-70 h-100 flex flex-col justify-between items-center rounded-2xl p-4 transition-all duration-500 ease-in-out
      ${isActive ? 'bg-teal-500 scale-110 shadow-2xl translate-y-0 opacity-100' : 'bg-teal-300 scale-90 opacity-60 translate-y-10'}`}>
      <Navbar />
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>Hello Hitesh</h1>
        <h1 className='text-2xl font-bold'>How can I help</h1>
        <h1 className='text-2xl font-bold'>you today?</h1>
      </div>
      <div className='w-full'>
        <input type="text" placeholder='+ Ask anything...'
          className='w-full px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all' />
      </div>
    </div>
  )
}

export { Cards1, Cards2, Cards3 }
