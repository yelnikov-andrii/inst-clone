import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router'

const SidebarLink = ({ icon, title, path, active }: { icon: React.ReactNode, title: string, path: string, active?: boolean }) => {
    return (
        <Link to={path} className={clsx('flex gap-3 items-center py-2 px-3 hover:bg-ig-hover-overlay', {
            'font-bold': active
        })}>
            {icon}
            {title}
        </Link>
    )
}

export default SidebarLink