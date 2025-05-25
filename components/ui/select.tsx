'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps {
    children: React.ReactNode
    onValueChange?: (value: string) => void
    defaultValue?: string
    value?: string
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

interface SelectContentProps {
    children: React.ReactNode
}

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string
    children: React.ReactNode
}

interface SelectValueProps {
    placeholder?: string
}

const SelectContext = React.createContext<{
    value?: string
    onValueChange?: (value: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}>({
    open: false,
    setOpen: () => { },
})

const Select: React.FC<SelectProps> = ({ children, onValueChange, defaultValue, value }) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: string) => {
        if (value === undefined) {
            setInternalValue(newValue)
        }
        onValueChange?.(newValue)
        setOpen(false)
    }

    return (
        <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
            <div className="relative">
                {children}
            </div>
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, children, ...props }, ref) => {
        const { open, setOpen } = React.useContext(SelectContext)

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                onClick={() => setOpen(!open)}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
        )
    }
)
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
    const { value } = React.useContext(SelectContext)
    return <span>{value || placeholder}</span>
}

const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
    const { open } = React.useContext(SelectContext)

    if (!open) return null

    return (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {children}
        </div>
    )
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
    ({ className, children, value, ...props }, ref) => {
        const { onValueChange } = React.useContext(SelectContext)

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                    className
                )}
                onClick={() => onValueChange?.(value)}
                {...props}
            >
                {children}
            </button>
        )
    }
)
SelectItem.displayName = 'SelectItem'

export {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} 