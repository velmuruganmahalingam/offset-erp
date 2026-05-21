'use client'
import ProjectTable from "@/components/project/ProjectTable"
type Props = {
  showActions?: boolean
}
export default function ProjectList() {

    return (
    <ProjectTable showActions />
)
   
}