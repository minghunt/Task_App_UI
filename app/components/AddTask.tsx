'use client'
import dynamic from 'next/dynamic'
import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from "./Modal";
import { addTask } from '@/api';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

const AddTask = () => {
  const router = useRouter();
  let { data: session } = useSession()

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const handleSubmitNewTask: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()
    await addTask({
      description: newTaskValue
    }, session?.user.token)
    setNewTaskValue("");
    setTaskCompleted(false)
    setModalOpen(false);
    router.refresh()
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTask} >
          <h3 className='font-bold text-lg '>Add new task</h3>
          <div className='modal-action'>
            <div className="w-full">
              <p className='mb-2 text-base float-left'>Name</p>
              <input
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
              <div className="flex mb-2 mt-4 ">
                <p className='text-base mr-2 self-center'>Completed</p>
                <input type="checkbox" checked={false} disabled={true} className='checkbox checkbox-secondary w-8 h-8' />
              </div>
            </div>
          </div>
          <button type='submit' className='btn float-right'>
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default dynamic(() => Promise.resolve(AddTask), { ssr: false }) 
