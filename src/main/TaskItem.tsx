import React, { useState } from "react"

interface Props {
  data: {
    name: string
    done: boolean
    key: string
  }
  handleEdit: () => void
  handleRemove: () => void
  handleClick: (l: boolean) => void
  dark: boolean
}

export default function TaskItem(props: Props) {
  const [isChecked, setChecked] = useState(props.data.done)
  // prevent clickthrough
  const [hoverOnEdit, setHoverOnEdit] = useState(false)

  return (
    <div
      className="flex flex-row my-2 mx-3 py-1 hover:bg-blue-200 dark:hover:bg-sky-900 rounded-3xl transition-colors duration-150 ease-linear group"
      style={{
        fontSize: "calc(2vh + 3px)",
      }}
      onClick={() => {
        if (!hoverOnEdit) {
          setChecked((e) => {
            return !e
          })
          props.handleClick(!isChecked)
        }
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className="mx-3 my-auto scale-125"
      />

      <label
        style={{
          transform: isChecked ? "translateX(5px)" : "translateX(0px)",
          transitionTimingFunction: "cubic-bezier(0, 1, 0.3, 1.9)",

          color: isChecked ? "#0006" : "#000",
          textDecoration: isChecked ? "line-through" : "none",
          filter: props.dark ? "invert(100%)" : "none",
        }}
        className="transition-all duration-200 flex-grow my-auto"
      >
        {props.data.name}
      </label>
      <div className="justify-self-end my-auto editButton mr-1 flex flex-row opacity-0 group-hover:opacity-100">
        <img
          src="https://cdn2.iconfinder.com/data/icons/business-shop-finance-symbols-set-3/91/Business_-_Shop_-_Finance_148-1024.png"
          alt="delete"
          className="w-8 rounded-full hover:bg-red-500 transition-all duration-100"
          onClick={() => {
            props.handleRemove()
          }}
          onMouseEnter={() => {
            setHoverOnEdit((_) => true)
          }}
          onMouseLeave={() => {
            setHoverOnEdit((_) => false)
          }}
          style={{
            filter: props.dark ? "invert(100%)" : "none",
          }}
        />
        <img
          src="https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-1024.png"
          alt="aaa"
          className="w-8 rounded-full hover:bg-green-300 p-1 transition-all duration-100"
          onClick={(e) => {
            props.handleEdit()
          }}
          onMouseEnter={() => {
            setHoverOnEdit((_) => true)
          }}
          onMouseLeave={() => {
            setHoverOnEdit((_) => false)
          }}
          style={{
            filter: props.dark ? "invert(100%)" : "none",
          }}
        />
      </div>
    </div>
  )
}
