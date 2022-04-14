import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createSubTask, createTodo, getAllTodos } from './app.service';
import { Todo, SubTask } from "todo-commons";
function App() {

  const [todoTitle, setTodo] = useState("");
  const [subTaskTitle, setSubTask] = useState<any>({ title: "", id: "" });
  const [list, setList] = useState<Todo | any>([]);
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease');


  useEffect(() => {
    getTodos()
  }, []);

  async function getTodos() {
    const dataRaw = await getAllTodos();
    const data = await dataRaw.json();
    console.log("DATA ", data);
    if (data?.status) {
      setList(data.value);
    }

  }

  async function createTodos() {
    const dataRaw = await createTodo({ title: todoTitle });
    const data = await dataRaw.json();
    console.log("DATA TODO NEW", data);
    if (data?.status) {
      // setList(data.value);
      setList((list: any) => [...list, data.value]);
      setTodo("");
    }

  }

  async function createSubTasks(id: any) {
    const dataRaw = await createSubTask({ title: subTaskTitle.title, todo_id: id });
    const data: any = await dataRaw.json();
    console.log("DATA TODO NEW", data);
    if (data?.status) {
      let newArr = [...list]; // copying the old datas array
      const index = newArr.findIndex((dataArr: Todo) => dataArr.id == data.value.id);
      newArr[index] = data.value;

      setList(newArr);

      setSubTask({ title: "", id: "" });
    }

  }

  return (
    <div className='flex justify-center'>
      <div className="App flex justify-center my-7 w-4/6 flex-col">
        <div className='flex flex-col h-14'>
          <p className='font-bold text-3xl font-mono'>Todo App</p>
        </div>
        <div className="flex flex-row h-14">
          <div className="flex-none w-8/12">
            <input
              type="text"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={todoTitle}
              placeholder="What to do?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="flex-initial w-4/12 px-2">
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${!todoTitle ? "opacity-50" : ""}`} type="button"
              onClick={() => { createTodos() }}
              disabled={!todoTitle}
            >
              New List
            </button>
          </div>
        </div>

        <div className="accordion" id="accordionExample5">
          {list.map((data: Todo, index: number) => (
            <div key={index} className="accordion-item bg-white border border-gray-200">
              <h2 className="accordion-header mb-0" id="headingOne5">
                <button className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne5" + index} aria-expanded="true"
                  aria-controls={"collapseOne5" + index}>
                  <span className='font-bold text-lg'>{index + 1} . {data.title}</span>
                </button>
              </h2>
              <div id={"collapseOne5" + index} className="accordion-collapse collapse show" aria-labelledby="headingOne5">
                {data.subtasks.map((subT: SubTask, index: number) => (
                  <div key={index} className="flex accordion-body py-4 px-5 border-b-2 border-b-blue-500">
                    <span className='font-semibold'>{index + 1} . {subT.title}</span>
                  </div>
                ))}
                <div className="flex flex-row p-4">
                  <div className="flex-none w-8/12">
                    <input
                      type="text"
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      value={subTaskTitle.id == data.id ? subTaskTitle.title : ''}
                      placeholder="What are the steps?"
                      onChange={(e) => setSubTask({ title: e.target.value, id: data.id })}
                    />
                  </div>
                  <div className="flex-initial w-4/12 px-2">
                    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${(!subTaskTitle.title || subTaskTitle.id != data.id) ? "opacity-50" : ""}`} type="button"
                      onClick={() => { createSubTasks(data.id) }}
                      disabled={!subTaskTitle.title && !subTaskTitle.id}
                    >
                      New Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>

  );
}

export default App;
