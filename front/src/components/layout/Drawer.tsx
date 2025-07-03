import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import clsx from 'clsx';
import { closeDrawer } from '../../features/drawer/drawerReducer';

const Drawer = ({ children }: { children: React.ReactNode }) => {
    const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
    const dispatch = useDispatch();
    return (
        <div
            className={clsx(
                'fixed inset-0 bg-transparent transition-all duration-500 z-40',
                isOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            onClick={() => { dispatch(closeDrawer()) }}>
            <div className={clsx(
                'fixed left-0 top-0 bottom-0 w-[397px] bg-white rounded-xl border border-ig-stroke transition-transform duration-500',
                isOpen ? 'translate-x-[55px]' : '-translate-x-full'
            )}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Drawer