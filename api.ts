import { ITask } from "./types/tasks"
import axios from 'axios'
const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMwYWFkMmUyNTRiM2E0ZmVkMzg4NGMiLCJpYXQiOjE2OTAzNTgxNTV9.xwBaZh3Jj9CIdF69-oodGPrBWlM9MvCker_ZQr4-lb0'
});
const baseUrl = 'https://task-app-api-3jqj.onrender.com'
const localUrl = 'http://localhost:3001'
export const Login=async(username:any,password:any)=>{
  let body={
    email:username,
    password:password}

  let res=await axios.post(`${baseUrl}/users/login`,body,{
    headers:{'Content-Type': 'application/json',}
  }
  )
  return res.data
}
export const Register_api=async(user:any)=>{
  try {
    let body={
      name:user.username,
      email:user.email,
      password:user.password}
  
    let res=await axios.post(`${baseUrl}/users`,body,{
      headers:{'Content-Type': 'application/json',}
    }
    )
    if (res.status===400)
      return true
    return res.data
  } catch (error) {
    
  }
}
export const getAllTasks = async (token:any): Promise<ITask[]> => {
  let tasks =
    await axios.get(`${baseUrl}/tasks?sortBy=completed:asc`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  return tasks.data;

}
export const addTask = async (task: any,token:any): Promise<ITask> => {
  const res = await axios.post(`${baseUrl}/tasks`,
    task
    , {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  return res.data;
}
export const removeTask = async (_id: string,token:any): Promise<ITask> => {
  const res = await axios.delete(`${baseUrl}/tasks/` + _id
    , {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  return res.data;
}

export const editTask = async (task: ITask,token:any): Promise<ITask> => {
  const res = await axios.patch(`${baseUrl}/tasks/` + task._id,
    {
      description:task.description,
      completed:task.completed
    }
  ,
      {headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  return res.data;
}