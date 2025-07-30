import React from 'react'

const Modal = ({ children, onClose, styleProps }: { children: React.ReactNode, onClose: any, styleProps: any }) => {

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500/50 z-50 center"
      onClick={onClose}
    >
      <div 
        className='py-2 px-3 bg-ig-primary-background mx-auto my-auto w-full rounded-2xl' 
        onClick={(e) => e.stopPropagation()}
        style={styleProps}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal