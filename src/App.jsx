import React, { useState } from "react";
import RemoveIcon from './assets/delete.svg'
import EditIcon from './assets/edit.svg'
import OkIcon from './assets/ok.svg'
import CancelIcon from './assets/cancel.svg'

const App = () => {
  const [todosArr, setTodosArr] = useState([]);
  const [inputAddTodoTask, setInputAddTodoTask] = useState("");
  const [inputEditTodoTask, setInputEditTodoTask] = useState("");

  const handlerOnInputAddTodo = (e) => {
    setInputAddTodoTask(e.target.value);
  };

  const handlerOnInputEditTodo = (e) => {
    setInputEditTodoTask(e.target.value);
  };

  const addTodo = () => {
    if (inputAddTodoTask === "") {
      alert("Enter Todo");
    } else if (inputAddTodoTask !== "") {
      setTodosArr([
        ...todosArr,
        { Task: inputAddTodoTask, Editing: false, isCompleted: false },
      ]);
      setInputAddTodoTask("");
    }
  };

  const removeTodo = (index) => {
    setTodosArr(
      todosArr.filter((e, i) => {
        return i !== index;
      })
    );
  };

  const toggleComplete = (index) => {
    setTodosArr(
      todosArr.map((e, i) => {
        if (i === index) {
          return { ...e, isCompleted: !e.isCompleted };
        }
        return e;
      })
    );
  };

  const editTodo = (index) => {
    setTodosArr(
      todosArr.map((e, i) => {
        if (i === index) {
          setInputEditTodoTask(e.Task);
          return { ...e, Editing: !e.Editing };
        }
        return e;
      })
    );
  };

  const saveEditedTodo = (index) => {
    setTodosArr(
      todosArr.map((e, i) => {
        if (inputEditTodoTask === "") {
          alert("Empty Todo Task!!!!");
        } else if (i === index && inputEditTodoTask !== "") {
          return { ...e, Task: inputEditTodoTask, Editing: !e.Editing };
        }
        return e;
      })
    );
  };

  return (
    <div className="">
      <div className="bg-[#1c1c1c] h-[23dvh] flex justify-center items-center">
        <h1 className="text-[#ffffff] text-[48px] font-extrabold text-center">
          TODO APP
        </h1>
      </div>

      <div className="flex justify-center gap-3">
        <input
          className="w-[62%] h-[52px] rounded-4xl bg-[#d9d9d9] relative top-[-25px] px-[25px] text-xl"
          type="text"
          id="inputTxt-TodoTask"
          value={inputAddTodoTask}
          onChange={handlerOnInputAddTodo}
        />
        <button
          className="h-[52px] w-[10%] p-0.5 sm:leading-[1.2] max-sm:text-[15px] bg-[#326F9A] rounded-4xl relative top-[-25px] font-bold text-[18px] text-white min-w-[90px]"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 p-2">
        {todosArr.map((todo, index) => {
          return (
            <div
              key={index}
              className="box-content flex items-center gap-2 rounded-2xl w-[43%] max-h-[150px] bg-[#1c1c1c] p-3.5 text-xl text-white min-w-[300px]"
            >
              {/* Toggle Todo Complete */}
              {todo.Editing ? (
                ""
              ) : (
                <input
                  type="checkbox"
                  id="isCompletedTodo"
                  onChange={() => {
                    toggleComplete(index);
                  }}
                />
              )}

              {/* Todo.Task || InputEditTodoTask */}
              {todo.Editing ? (
                <textarea
                  className="w-[90%] h-[35px] max-h-[100px] bv"
                  type="text"
                  id="inputEditTodo"
                  value={inputEditTodoTask}
                  onChange={handlerOnInputEditTodo}
                />
              ) : (
                <span
                  className={`w-[90%] max-h-[100px] overflow-x-hidden overflow-y-auto ${
                    todo.isCompleted ? "line-through" : "no-underline"
                  }`}
                >
                  {todo.Task}
                </span>
              )}

              {/* For Save Edited Todo */}
              {todo.Editing ? (
                <button
                  className="w-5.5"
                  onClick={() => {
                    saveEditedTodo(index);
                  }}
                >
                  <img src={OkIcon} alt="Remove" />
                </button>
              ) : (
                ""
              )}

              {/* Toggle Todo Edit/Cancel */}
              <button className="w-[20px]" onClick={() => editTodo(index)}>
                {todo.Editing ? (
                  <img src={CancelIcon} alt="Remove" />
                ) : (
                  <img src={EditIcon} alt="Remove" />
                )}
              </button>

              {/* Todo Remove */}
              <button className="w-[20px]" onClick={() => removeTodo(index)}>
                <img src={RemoveIcon} alt="Remove" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
