import { useState } from 'react'
import { Cards1, Cards2, Cards3 } from './components/project3'

function App3() {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 my-2'>
        <h1 className='px-4 py-2 bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-500 text-black font-semibold rounded-2xl shadow-lg'>
          Join Our Waitlist and claim instant offer
        </h1>
        <h1 className='text-4xl font-bold mt-6 text-slate-900'>Translate Ideas into Reality</h1>
        <h1 className='text-4xl font-bold'>With vynk</h1>
        <p>Roll up beautiful UIs effortlessly using vynk CLI</p>
        <p>Focus on building the core of your product</p>
        <button className='bg-gray-900 text-white px-4 my-4 py-2 rounded-2xl'>
          Try for Free
        </button>
        <div className='flex gap-6 items-center justify-center mt-10'>
          <div onClick={() => setActive(0)}>
            <Cards2 isActive={active === 0} />
          </div>
          <div onClick={() => setActive(1)}>
            <Cards1 isActive={active === 1} />
          </div>
          <div onClick={() => setActive(2)}>
            <Cards3 isActive={active === 2} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App3
