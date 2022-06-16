import {createContext} from 'react'

export const Context = createContext<any>({})
interface Props {
  children: React.ReactNode
  value: any
}

export default function ContextWrapper(props: Props) {
  const {children, value} = props

  return <Context.Provider value={value}>{children}</Context.Provider>
}
