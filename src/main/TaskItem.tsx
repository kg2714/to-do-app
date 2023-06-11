import React, { useState } from "react"
import { Data } from "./Data"

interface Props {
  data: Data
  handleEdit: () => void
}

export default function TaskItem(props: Props) {
  const [isChecked, setChecked] = useState(props.data.done)
  // prevent clickthrough
  const [hoverOnEdit, setHoverOnEdit] = useState(false)

  return (
    <div
      className="flex flex-row my-2 px-2 py-1 hover:bg-slate-400 rounded-3xl transition-colors duration-150 ease-linear"
      style={{
        fontSize: "calc(2vh + 5px)",
      }}
      onClick={() => {
        setChecked((e) => (hoverOnEdit ? e : !e))
      }}
    >
      <input type="checkbox" checked={isChecked} className="mr-2 my-auto" />
      <label
        style={{
          transform: isChecked ? "translateX(5px)" : "translateX(0px)",
          transitionTimingFunction: "cubic-bezier(0, 1, 0.3, 1.9)",

          color: isChecked ? "#0006" : "#000",
          textDecoration: isChecked ? "line-through" : "none",
        }}
        className="transition-all duration-200 flex-grow my-auto"
      >
        {props.data.name}
      </label>
      <div
        className="justify-self-end my-auto rounded-full hover:bg-teal-300 p-2 editButton"
        onClick={(e) => {
          props.handleEdit()
        }}
        onMouseEnter={() => {
          setHoverOnEdit((_) => true)
        }}
        onMouseLeave={() => {
          setHoverOnEdit((_) => false)
        }}
      >
        <img
          src="https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-1024.png"
          alt="aaa"
          className="w-6 pointer-events-none"
        />
      </div>
    </div>
  )
}
