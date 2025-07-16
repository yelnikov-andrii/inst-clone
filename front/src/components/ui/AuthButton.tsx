import clsx from "clsx"
import type React from "react"

const AuthButton = ({ children, primary, disabled, type }: { children: React.ReactNode, primary?: boolean, disabled?: boolean, type?: "submit"| "reset" | "button" | undefined }) => {
    return (
        <button
            type={type}
            className={clsx('text-white py-1 px-4 bg-ig-button-primary-background hover:bg-ig-button-primary-background--hover w-full rounded-lg', {
                'bg-ig-primary-button hover:bg-ig-primary-button-hover': primary,
                'opacity-60 cursor-none': disabled
                
            })} onClick={() => { console.log('login') }}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default AuthButton