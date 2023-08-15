import React from 'react'

export default function List() {
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
