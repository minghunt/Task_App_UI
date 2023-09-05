'use client'
import { ITask } from "@/types/tasks";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { getAllTasks } from "@/api";
const TaskNoSSR = dynamic(() => import('./Task'), { ssr: false })
import { useSession } from 'next-auth/react'

const TaskList= () => {
    const [tasks,setTasks]=useState<ITask[]>([])
    let { data: session } = useSession()
    const getData=async()=>{

        const data=await getAllTasks(session?.user.token)
        setTasks(data)  
    } 
    
    getData()
    useEffect(()=>{
    
    },[session,tasks])
    return (<div className="overflow-x-auto flex ">
        <table className="table w-full ">
            {/* head */}
            <thead>
                <tr className='text-base text-center'>
                    <th className="text-left">Name</th>
                    <th >Completed</th>
                    <th>Created At</th>
                    <th >Updated At</th>
                    <th >ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                {tasks.map(task => (
                    <TaskNoSSR key={task._id} task={task} />
                )
                )}
            </tbody>
        </table>
    </div>)

}
export default dynamic(() => Promise.resolve(TaskList), { ssr: false }) 
