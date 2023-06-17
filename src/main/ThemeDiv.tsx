import React from "react"

interface Props {
  children: React.ReactNode
  dark: boolean
}

export default function ThemedDiv(props: Props) {
  return !props.dark ? (
    <div className="flex w-screen h-screen justify-center items-center text-black bg-white">
      {props.children}
    </div>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center dark text-white bg-zinc-900">
      {props.children}
    </div>
  )
}
