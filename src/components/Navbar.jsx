import React from 'react'

export const Navbar = () => {
  return (
   <nav className='flex justify-between bg-violet-800 text-white  py-4'>
    <div className="logo cursor-pointer ">
     <span className='font-bold text-xl mx-9'>MTasks</span> 
    </div>
    <ul className='flex gap-8 mx-9'>
      <li className='cursor-pointer hover:font-bold  transition-all duration-75\'>Home</li>
      <li className='cursor-pointer hover:font-bold  transition-all duration-75\'>Your Tasks</li>
    </ul>
   </nav>
  )
}
