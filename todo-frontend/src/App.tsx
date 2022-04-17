import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createSubTask, createTodo, deleteTodo, getAllTodos, updateSubTask, updateTodo } from './app.service';
import { Todo, SubTask } from "todo-commons";
function TodoComponent() {

  const [todoTitle, setTodo] = useState("");
  const [subTaskTitle, setSubTask] = useState<any>({ title: "", id: "" });
  const [list, setList] = useState<Todo | any>([]);
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
  }, []);

  async function getTodos() {
    const dataRaw = await getAllTodos();
    const data = await dataRaw.json();
    console.log("DATA ", data);
    if (data?.status) {
      setList(data.value);
      setIsLoading(false);
    }

  }

  async function createTodos() {
    setIsLoading(true);
    const dataRaw = await createTodo({ title: todoTitle });
    const data = await dataRaw.json();
    // console.log("DATA TODO NEW", data);
    if (data?.status) {
      // setList(data.value);
      setList((list: any) => [...list, data.value]);
      setTodo("");
      setIsLoading(false);
    }

  }

  async function createSubTasks(id: any) {
    setIsLoading(true);
    const dataRaw = await createSubTask({ title: subTaskTitle.title, todo_id: id });
    const data: any = await dataRaw.json();
    // console.log("DATA SUB NEW", data);
    if (data?.status) {
      let newArr = [...list]; // copying the old datas array
      const index = newArr.findIndex((dataArr: Todo) => dataArr.id == data.value.id);
      newArr[index] = data.value;

      setList(newArr);

      setSubTask({ title: "", id: "" });
      setIsLoading(false);
    }

  }


  async function updateTodos(status: boolean, id: any) {
    setIsLoading(true);
    const dataRaw = await updateTodo({ status: status ? "COMPLETED" : "PENDING" }, id);
    const data = await dataRaw.json();
    // console.log("DATA TODO UPDATE", data);
    if (data?.status) {
      let newArr = [...list]; // copying the old datas array
      const index = newArr.findIndex((dataArr: Todo) => dataArr.id == data.value.id);
      console.log("index ", index);

      newArr[index] = data.value;

      setList(newArr);
      setIsLoading(false);
    }

  }

  async function updateSubTasks(status: boolean, id: any) {
    setIsLoading(true);
    const dataRaw = await updateSubTask({ status: status ? "COMPLETED" : "PENDING" }, id);
    const data = await dataRaw.json();
    // console.log("DATA SUB UPDATE", data);
    if (data?.status) {
      let newArr = [...list]; // copying the old datas array
      const index = newArr.findIndex((dataArr: Todo) => dataArr.id == data.value.id);
      console.log("index ", index);

      newArr[index] = data.value;

      setList(newArr);
      setIsLoading(false);
    }

  }

  async function deleteTodos(id: any) {
    setIsLoading(true);
    const dataRaw = await deleteTodo(id);
    const data = await dataRaw.json();
    // console.log("DATA TODO DELETE", data);
    if (data?.status) {
      let newArr = [...list]; // copying the old datas array
      const index = newArr.findIndex((dataArr: Todo) => dataArr.id == id);
      console.log("index ", index);

      newArr.splice(index, 1);

      setList(newArr);
      setIsLoading(false);
    }

  }


  return (
    <div className='flex justify-center'>
      {isLoading &&
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: "50%" }}>
            <>
              <div
                className="bg-indigo-500 p-1 mr-1  w-10 h-10 rounded-full animate-bounce blue-circle"
              ></div>
              <div
                className="bg-indigo-200 p-1 mr-1   w-10 h-10 rounded-full animate-bounce green-circle"
              ></div>
              <div
                className="bg-indigo-400 p-1 mr-1   w-10 h-10 rounded-full animate-bounce red-circle"
              ></div>
            </>
          </div>
        </div>
      }
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
              name="todo-input"
              aria-label="todo-input"
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
              <div className='flex'>
                <div className="flex w-1/6 content-center justify-center items-center border-b border-b-gray-200" >
                  <input data-testid={"todo-task" + data.id} onChange={(e) => { updateTodos(e.target.checked, data.id) }} disabled={data.status === "COMPLETED" ? true : false} checked={data.status === "COMPLETED" ? true : false} className="form-check-input appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                </div>
                <div className="accordion-header mb-0 w-5/6" id="headingOne5">
                  <button className="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne5" + data.id} aria-expanded="true"
                    aria-controls={"collapseOne5" + data.id}>
                    <span className='font-bold text-lg text-blue-500' id={data.id}>{data.title}</span>
                  </button>
                </div>
                <div className="flex w-1/6 content-center justify-center items-center border-b border-b-gray-200" >
                  <svg onClick={() => { deleteTodos(data.id) }} data-testid={"todo-task-delete" + data.id} style={{ fill: '#df2b2b', cursor:'pointer' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z" /></svg>
                </div>
              </div>

              <div id={"collapseOne5" + data.id} className="accordion-collapse collapse show" aria-labelledby="headingOne5">
                {data.subtasks.map((subT: SubTask, index: number) => (
                  <div className='flex' key={index + "$"}>
                    <div className="flex w-1/6 content-center justify-center items-center border-b-2 border-b-blue-500" >
                      <input data-testid={"todo-sub-task" + data.id} onChange={(e) => { updateSubTasks(e.target.checked, subT.id) }} checked={subT.status === "COMPLETED" ? true : false} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                    <div key={index} className="flex accordion-body py-4 px-5 border-b-2 border-b-blue-500 w-5/6">
                      <span className='font-semibold'>{subT.title}</span>
                    </div>
                  </div>
                ))}
                <div className="flex flex-row p-4" data-testid={data.id}>
                  <div className="flex-none w-8/12">
                    <input
                      type="text"
                      data-testid={"subtask-input" + data.id}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      value={subTaskTitle.id == data.id ? subTaskTitle.title : ''}
                      placeholder="What are the steps?"
                      onChange={(e) => setSubTask({ title: e.target.value, id: data.id })}
                    />
                  </div>
                  <div className="flex-initial w-4/12 px-2">
                    <button data-testid={"subtask-btn" + data.id} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${(!subTaskTitle.title || subTaskTitle.id != data.id) ? "opacity-50" : ""}`} type="button"
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

export default TodoComponent;
