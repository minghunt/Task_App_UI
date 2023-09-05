import { useRouter } from 'next/navigation';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  const router = useRouter();
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='modal-box relative'>
        <label
          onClick={async() => {await router.refresh();setModalOpen(false);}}
          className='btn btn-sm btn-circle absolute right-2 top-2'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;