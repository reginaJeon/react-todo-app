import { result } from 'postcss';
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { List } from './List';

export const Lists = React.memo(({ todoData, setTodoData }) => {
  console.log("Lists component")
  //   const listStyle = (completed) => {
  //   return {
  //     padding: "10px",
  //     borderBottom: "1px #ccc dotted",
  //     textDecoration: completed ? "line-through" : "none",
  //   }
  // }; 

  const handleEnd = (result) => {
    //result 매개변수 = 드래그 이벤트의 source항목, 위치 정보 
    console.log(result);
    //목적지가 없는경우 함수 종료
    if (!result.destination) return;

    //새로운  todoData생성
    const newTodoData = todoData;

    //변경하는 아이템 배열에서 삭제->return 에서 해당 값 보관
    //log보면 기존 소스 인덱스가 나오는데, 그 인덱스 값에서 1개를 삭제한다는 의미
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    //타겟으로하는 위치에 해당 값을 삽입
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);

  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              <Draggable
                key={data.id}
                draggableId={data.id.toString()}
                index={index}
              >
                {(provided,snapshot)=>(
                  <List                    
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    completed={data.completed}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    provided={provided}
                    snapshot={snapshot}
                  />
                  )}
              </Draggable>
            ))}
              {provided.placeholder}
            </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
})
