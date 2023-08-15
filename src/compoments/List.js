import React from 'react'

export default function List({ todoData, setTodoData }) {
  
    const listStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  };
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "30%",
    cursor: "pointer",
    float: "right"
  };

  const handleCompChange = (id) => { 
    let newToData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newToData);
  };

 const handleClick = (id) => { 
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData)
    console.log('newToData', newTodoData);
  };
  
  return (
    <div>
        
        {todoData.map((data) => (
          <div style={listStyle(data.completed)} key={data.id} >
            <input type="checkbox"
              onChange={()=> handleCompChange(data.id)}
              defaultChecked={data.completed} /> { " "}
            { data.title } 
            <button style={btnStyle} onClick={()=>handleClick(data.id)}>x</button>
          </div>
        ))} 

    </div>
  )
}
