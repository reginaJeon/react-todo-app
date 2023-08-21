import React, { useState } from 'react'

export const List = React.memo(({handleClick,id, title, completed, todoData, setTodoData ,provided, snapshot}) => {
    console.log("List component")

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompChange = (id) => { 
        let newToData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newToData);
    };

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newTodoData = todoData.map(data => { 
            if (data.id === id) { 
                data.title = editedTitle
            }
            return data;
        })
        setTodoData(newTodoData)
        setIsEditing(false)
    };

    if (isEditing) { 
        return (
            <div
                className={`bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
                >                   
                <div className='items-center'>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={editedTitle}
                            onChange={handleEditChange}
                            className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
                        />
                    </form>       
              </div>
              <div className='items-center'>
                    <button
                        className='px-4 py-2 float-right'
                        onClick={() => handleClick(id)}
                    >x</button>
                    <button
                        className='px-4 py-2 float-right'
                        type='submit'
                        onClick={handleSubmit}
                    >save</button>
              </div>
          </div>
        )
    } else {
        return (
          <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
          >                   
              <div className='items-center'>
                  <input
                      type="checkbox"
                      onChange={()=> handleCompChange(id)}
                      defaultChecked={completed}
                  />
                  {" "}
                  <span className={ completed ? 'line-through' : undefined }>{title}</span>              
              </div>
              <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
                    <button className='px-4 py-2 float-right' onClick={()=>setIsEditing(true)}>edit</button>
              </div>
          </div>
        )        
    }
})
