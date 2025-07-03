import clsx from 'clsx'
import React from 'react'

const SidebarButton = ({ icon, title, onClick, active }: { icon: React.ReactNode, title: string, onClick: () => void, active?: boolean }) => {
    return (
        <button
            onClick={onClick}
            className={clsx('flex gap-3 items-center py-2 px-3 hover:bg-ig-hover-overlay', {
                'font-bold': active
            })}
        >
            {icon}
            {title}
        </button>
    )
}

export default SidebarButton