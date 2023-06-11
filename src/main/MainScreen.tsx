import React, { useState, useEffect } from "react"
import TaskList from "./TaskList"
import "./style/fonts.css"
import { Data } from "./Data"
import TaskItem from "./TaskItem"
import "./style/scrollbar.css"
import Modal from "./Modal"
import { getIndexOfData } from "./utils/ArrayProcessing"

const initData: Data[] = [new Data("asdasd", true)]

export const MainScreen: React.FC = () => {
  const [data, setData] = useState(initData)

  const [isShownAddModal, setShownAddModal] = useState(false)
  const [isShownEditModal, setShownEditModal] = useState(false)

  useEffect(() => {
    console.log(isShownAddModal ? "Modal shown" : "Closed modal")
  }, [isShownAddModal])

  const showModal = () => {
    setShownAddModal((e) => !e)
  }

  const [focusTextbox, setFocus] = useState(false)
  const [taskName, setTaskName] = useState("")

  //add modal content

  const handleAddTask = (taskName: string) => {
    setData((_) =>
      taskName !== "" ? [...data, new Data(taskName, false)] : [...data]
    )

    setShownAddModal((_) => false)
    setTaskName((_) => "")
  }
  var AddModalContent = () => {
    return (
      <Modal>
        <p className="self-start">Enter task name:</p>

        <input
          type="text"
          className="self-center transition-all duration-100 px-3 py-2 rounded-lg mt-4"
          style={{
            width: "80%",
            border: "none",
            outline: "none",
          }}
          onChange={(e) => {
            setFocus((_) => e.target.value.length !== 0)
            setTaskName(() => {
              return focusTextbox ? e.target.value : ""
            })
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask(taskName)
            }
          }}
        />
        <button
          className="self-end mr-2 mt-3 px-4 py-2 bg-white bg-opacity-60 rounded-3xl"
          onClick={() => {
            handleAddTask(taskName)
          }}
        >
          Add new task
        </button>
      </Modal>
    )
  }

  const [editingData, setEditingData] = useState(new Data("", true))
  const [editingTaskName, setEditingTaskName] = useState("")

  // edit modal content

  const showEditModal = (data: Data) => {
    setShownEditModal((_) => true)
    setEditingData(data)
  }

  function handleEdit() {
    var edit = data
    edit[getIndexOfData(edit, editingData)] = new Data(
      editingTaskName,
      editingData.done
    )
    setData((_) => edit)

    setShownEditModal((_) => false)
    setEditingTaskName((_) => "")
  }

  const EditModalContent = () => {
    return (
      isShownEditModal && (
        <Modal>
          <p className="self-start">Edit the task name:</p>
          <input
            type="text"
            defaultValue={editingData.name}
            className="self-center transition-all duration-100 px-3 py-2 rounded-lg mt-4"
            onChange={(e) => {
              setEditingTaskName((_) => e.target.value)
            }}
            style={{
              width: "80%",
              border: "none",
              outline: "none",
            }}
          />

          <button
            className="self-end mr-2 mt-3 px-4 py-2 bg-white bg-opacity-60 rounded-3xl"
            onClick={() => {
              handleEdit()
            }}
          >
            Submit
          </button>
        </Modal>
      )
    )
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col sm:w-[70vw] sm:h-[90vh] w-screen h-screen rounded-lg bg-slate-300">
        <div className="self-start m-3">
          <p
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "calc(3vh + 16px)",
            }}
          >
            Todo List
          </p>
        </div>

        <TaskList>
          {data.map((p) => {
            return (
              <TaskItem
                data={p}
                key={p.key}
                handleEdit={() => {
                  showEditModal(p)
                }}
              />
            )
          })}
        </TaskList>
        <button
          onClick={showModal}
          className="self-end bg-blue-700 rounded-[4em] py-3 px-4 m-3"
        >
          Add Task
        </button>
      </div>
      {isShownAddModal && AddModalContent()}
      {isShownEditModal && EditModalContent()}
    </div>
  )
}
