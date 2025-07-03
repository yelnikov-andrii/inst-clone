import React from 'react'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../features/modal/modalSlice';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500/50 z-50 center"
      onClick={() => dispatch(closeModal())}
    >
      <div className='py-2 px-3 bg-ig-primary-background max-w-[400px] mx-auto my-auto w-full rounded-2xl' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal