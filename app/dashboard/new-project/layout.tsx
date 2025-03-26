import { FC, PropsWithChildren } from "react"

const ProjectLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default ProjectLayout