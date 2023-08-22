import React, { useState, useCallback } from "react";
import "./App.css";
import { Lists } from "./compoments/Lists";
import Form from "./compoments/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")):[];

export default function App (){ 
  console.log("App component")
  const [todoData, setTodoData] = useState(initialTodoData); 
  const [value, setValue] = useState("");

    const handleClick = useCallback((id) => { 
        let newTodoData = todoData.filter((data) => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
        console.log('newToData', newTodoData);
    },
      [todoData]
    );

  const handleSubmit = (e) => { 
    //form 안에 input 전송시 페이지 리로드 방지
    e.preventDefault();
    
    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    //원래 있던 할 일에 새로운 할 일 더하기
    //setTodoData([...todoData, newTodo]);
    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData',JSON.stringify([...todoData, newTodo]));
    setValue("");
  }

  const handleRemoveClick = () => { 
    setTodoData([]);
    localStorage.setItem('todoData',[]);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists handleClick={ handleClick} todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={ setValue} />        
      </div>
    </div>
  )
}