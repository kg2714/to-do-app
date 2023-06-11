import React from "react"

interface Props {
  children: React.ReactNode
}

export default function TaskList(props: Props) {
  return <div className="mx-3 h-full overflow-y-auto">{props.children}</div>
}
