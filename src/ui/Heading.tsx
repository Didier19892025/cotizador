import {ReactNode} from 'react'

export default function Heading({ children}: { children: ReactNode}) {
  return (
   <h1 className='text-lg font-bold'>{children}</h1>
  )
}
