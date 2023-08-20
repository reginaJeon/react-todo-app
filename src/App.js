import React, { useState } from "react";
import "./App.css";
import List from "./compoments/Lists";
import Form from "./compoments/Form";

export default function App (){ 

  const [todoData, setTodoData] = useState([]); 
  const [value, setValue] = useState("");

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
    setValue("");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={ setValue} />        
      </div>
    </div>
  )
}