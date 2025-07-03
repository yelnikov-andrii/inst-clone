import React from 'react'

const PostFooterButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}

export default PostFooterButton