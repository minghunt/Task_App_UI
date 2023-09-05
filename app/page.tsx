"use client"
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSession, signOut, getSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

const AddTaskNoSSR = dynamic(() => import('./components/AddTask'), { ssr: false })
const TaskListNoSSR = dynamic(() => import('./components/TaskList'), { ssr: false })
export default function Home() {
  let { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('\/login')
    },
  })
 
  
  function handdleSignOut() {
    signOut()
  }
  
  return (
    <>
    {session ? User({ session, handdleSignOut}) : <></>}
    <main className="max-w-4xl mx-auto mt-4">
       
       <div className="text-center my-5 flex flex-col gap-4">
         <h1 className="text-2xl font-bold">Task App</h1>
         <AddTaskNoSSR />
         <TaskListNoSSR /> 
       </div>
      
     </main>
    </>
  )
}

function User({ session, handdleSignOut,username,email }: any) {
  
  return (
    <div className="navbar px-20 py-5">
      <div className="flex-1">
  </div>
  <div className="justify-end flex-none text-white">
    <div className="dropdown dropdown-end " >
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
        <div className="w-10 rounded-full">
          <img src={session?.user.image} />
        </div>
      </label>
      <ul className="mt-1 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-500 rounded-box w-52">
        <li>
          <a className="justify-between">
          {session?.user.email}
          </a>
        </li>
        <li><a className="justify-between">{session?.user.name}
          </a></li>
        <li><button onClick={() => handdleSignOut()} className='justify-center text-center rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button></li>
      </ul>
    </div>
  </div>
</div>
    
        
  )
}

