import React from "react"

interface Props {
  children: React.ReactNode
}

export default function Modal(props: Props) {
  return (
    <div
      className={`absolute flex w-screen h-screen justify-center items-center bg-opacity-50 bg-slate-300 transition-all duration-200`}
    >
      <div className="w-[80%] bg-indigo-600 bg-opacity-70 rounded-2xl">
        <div className="m-4">
          <div className="flex flex-col w-full h-full justify-center items-center">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
