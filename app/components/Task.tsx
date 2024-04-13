"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { removeTask, editTask } from "@/api";
import { useSession } from 'next-auth/react'

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  let { data: session } = useSession()

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.description);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(task.completed);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      ...task,
      description: taskToEdit,
      completed: taskCompleted
    }, session?.user.token);
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (_id: string) => {
    await removeTask(_id, session?.user.token);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task._id} >
      <td className='w-4/12 '>{task.description}</td>
      <td className='w-5 text-center'><input type="checkbox" style={{ cursor: 'not-allowed' }} checked={task.completed} className="checkbox checkbox-secondary" /></td>
      <td className='w-24 text-center'>{new Date(task.createdAt).toLocaleString('vi')}</td>
      <td className='w-24 text-center'>{new Date(task.updatedAt).toLocaleString('vi')}</td>
      <td className='flex gap-7 flex justify-center '>
        <FiEdit
          onClick={() => { setOpenModalEdit(true); setTaskCompleted(task.completed); setTaskToEdit(task.description) }}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo} >
            <h3 className='font-bold text-lg text-center'>Edit task</h3>
            <div className='modal-action'>
              <div className="w-full">
                <p className='mb-2 text-base '>Name</p>
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full'
                />
                <div className="flex mb-2 mt-4 ">
                  <p className='text-base mr-2 self-center'>Completed</p>
                  <input type="checkbox" onChange={(e) => { setTaskCompleted(e.target.checked) }} size={50} checked={taskCompleted} className='checkbox checkbox-secondary w-8 h-8' />
                </div>
              </div>
            </div>
            <button type='submit' className='btn float-right'>
              Submit
            </button>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task._id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;