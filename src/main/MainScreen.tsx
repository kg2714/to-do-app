import React, { useState, useEffect } from "react"
import "./style/fonts.css"
import TaskItem from "./TaskItem"
import "./style/scrollbar.css"
import Modal from "./utils/Modal"
import { getIndexOfData } from "./utils/ArrayProcessing"
import store from "store2"
import shortid from "shortid"
import { Data } from "./utils/DataInterface"
import ThemedDiv from "./utils/ThemeDiv"

var initData: Data[] = []

export const MainScreen: React.FC = () => {
  // page content
  //////////preload for data fetching///////////

  useEffect(() => {
    const init = Object.keys(store())
    setData((_) => {
      var p: Data[] = []
      init.forEach((e) => {
        if (e !== "themeMode") {
          p = [
            ...p,
            {
              name: store.get(e).name,
              done: store.get(e).done,
              key: e,
            },
          ]
        }
      })
      return p
    })
  }, [])

  //////////end preload for data fetching///////////
  const [data, setData] = useState(initData)

  useEffect(() => {
    saveData()
  })

  const saveData = () => {
    data.forEach((e) => {
      if (e.name !== "") store.set(e.key, { name: e.name, done: e.done })
      else store.remove(e.key)
    })
  }

  const [isShownAddModal, setShownAddModal] = useState(false)
  const [isShownEditModal, setShownEditModal] = useState(false)

  // eslint-disable-next-line
  // useEffect(() => saveData(), [data])

  const showModal = () => {
    setShownAddModal((e) => !e)
  }

  const [focusTextbox, setFocus] = useState(false)
  const [taskName, setTaskName] = useState("")

  //add modal content

  const handleAddTask = (taskName: string) => {
    setData((_) => {
      return taskName !== ""
        ? [...data, { name: taskName, done: false, key: shortid.generate() }]
        : [...data]
    })

    setShownAddModal((_) => false)
    setTaskName((_) => "")
  }
  var AddModalContent = () => {
    return (
      isShownAddModal && (
        <Modal>
          <div className="flex flex-row justify-between w-full">
            <p className="self-start">Enter task name:</p>
            <button
              className="self-end"
              onClick={() => {
                setShownAddModal((_) => false)
                setTaskName((_) => "")
              }}
            >
              <img
                src="https://pic.onlinewebfonts.com/svg/img_376308.png"
                alt="X icon"
                width={24}
                style={{
                  filter: darkEnabled ? "invert(100%)" : "none",
                }}
              />
            </button>
          </div>

          <input
            type="text"
            className="self-center transition-all duration-100 px-3 py-2 rounded-lg mt-4 dark:bg-stone-800"
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
                saveData()
              }
            }}
          />
          <button
            className="self-end mr-2 mt-3 px-4 py-2 bg-white hover:bg-opacity-75 bg-opacity-60 rounded-3xl dark:bg-black dark:bg-opacity-40 dark:hover:bg-opacity-60"
            onClick={() => {
              handleAddTask(taskName)
              saveData()
            }}
          >
            Add new task
          </button>
        </Modal>
      )
    )
  }

  const [editingData, setEditingData] = useState({
    name: "",
    done: false,
    key: "",
  })
  const [editingTaskName, setEditingTaskName] = useState("")

  // edit modal content

  const showEditModal = (data: Data) => {
    setShownEditModal((_) => true)
    setEditingData(data)
  }

  function handleEdit() {
    var edit = data

    if (edit[getIndexOfData(edit, editingData)].name !== "") {
      edit[getIndexOfData(edit, editingData)].name = editingTaskName
      edit[getIndexOfData(edit, editingData)].done = editingData.done
    } else {
      edit = edit.filter((e) => e !== edit[getIndexOfData(edit, editingData)])
    }
    setData((_) => edit)

    setShownEditModal((_) => false)
    setEditingTaskName((_) => "")
    saveData()
  }

  const EditModalContent = () => {
    return (
      isShownEditModal && (
        <Modal>
          <div className="flex flex-row justify-between w-full">
            <p className="self-start">Edit the task name:</p>
            <button
              className="self-end"
              onClick={() => {
                setShownEditModal((_) => false)
              }}
            >
              <img
                src="https://pic.onlinewebfonts.com/svg/img_376308.png"
                alt="X icon"
                width={24}
                style={{
                  filter: darkEnabled ? "invert(100%)" : "none",
                }}
              />
            </button>
          </div>
          <input
            type="text"
            defaultValue={editingData.name}
            className="self-center transition-all duration-100 px-3 py-2 rounded-lg mt-4 dark:bg-stone-800"
            onChange={(e) => {
              setEditingTaskName((_) => e.target.value)
            }}
            style={{
              width: "80%",
              border: "none",
              outline: "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit()
              }
            }}
            maxLength={100}
          />

          <button
            className="self-end mr-2 mt-3 px-4 py-2 bg-white hover:bg-opacity-75 bg-opacity-60 rounded-3xl dark:bg-black dark:bg-opacity-40 dark:hover:bg-opacity-60"
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

  const handleRemove = (p: Data) => {
    const l = data.filter((e) => e !== p)
    store.remove(p.key)
    return l
  }

  window.addEventListener("beforeunload", () => {
    store(false)
    saveData()
    store.set("themeMode", darkEnabled ? "dark" : "light")
  })

  const [darkEnabled, setDarkEnabled] = useState(
    store.get("themeMode") === "dark"
  )

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden"></div>
      <ThemedDiv dark={darkEnabled}>
        <div className="flex flex-col sm:w-[70vw] sm:h-[90vh] w-screen h-screen rounded-lg bg-slate-300 dark:bg-slate-700 bg-opacity-50 backdrop-blur-lg">
          <div className="self-start w-full">
            <div className="flex flex-row justify-between m-4 align-center">
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "calc(3vh + 16px)",
                }}
              >
                Todo List
              </p>
              <button
                onClick={() => {
                  setDarkEnabled((e) => !e)
                }}
                className="transition-all duration-100 ease-out text-3xl rounded-full bg-opacity-0 hover:bg-opacity-100 dark:bg-opacity-0 dark:hover:bg-opacity-100 dark:bg-slate-500 bg-sky-400 h-16 w-16"
              >
                {!darkEnabled ? "☀" : "☾"}
              </button>
            </div>
          </div>
          <div className="mx-3 h-full overflow-y-auto">
            {data.map((p) => {
              return (
                p.name !== "" && (
                  <TaskItem
                    dark={darkEnabled}
                    data={p}
                    key={p.key}
                    handleEdit={() => {
                      showEditModal(p)
                    }}
                    handleRemove={() => {
                      setData((_) => handleRemove(p))
                    }}
                    handleClick={(l) => {
                      var edit = data
                      edit[getIndexOfData(data, p)].done =
                        !edit[getIndexOfData(data, p)].done

                      setData((_) => data)

                      saveData()
                    }}
                  />
                )
              )
            })}
          </div>
          <button
            onClick={showModal}
            className="self-center bg-sky-300 dark:bg-blue-700 rounded-full py-3 px-6 m-3"
          >
            <div className="flex flex-row">
              <img
                src="https://i.kisscc0.com/20180813/rke/kisscc0-computer-icons-symbol-plus-and-minus-signs-icon-hospital-15-5b71f9c17cb486.2720203215341961615108.png"
                alt="Plus sign"
                width={24}
                className="mr-2"
                style={{
                  filter: darkEnabled ? "invert(100%)" : "none",
                }}
              />
              <p>Add Task</p>
            </div>
          </button>
        </div>
        {isShownAddModal && AddModalContent()}
        {isShownEditModal && EditModalContent()}
      </ThemedDiv>
    </>
  )
}
