import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router'

const TabLink = ({ path, children, active }: { path: string, children: React.ReactNode, active?: boolean }) => {
    return (
        <Link to={path} className={clsx('pt-2 flex gap-2 items-center', {
            'border-t border-t-black text-black font-medium': active,
            'text-ig-secondary-text': !active
        })}>
            {children}
        </Link>
    )
}

export default TabLink