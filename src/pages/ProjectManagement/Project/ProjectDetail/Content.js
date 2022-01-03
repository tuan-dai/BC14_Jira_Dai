import { Avatar } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getTaskDetail, updateStatus } from "../../../../redux/actions/Task";
import InfoModal from "./InfoModal";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Content(props) {
  const { projectDetail } = props
  const dispatch = useDispatch()


  const handleDragEnd = (result) => {
    const { source, destination } = result
    let { taskId, projectId } = JSON.parse(result.draggableId)
    if (!result.destination) {
      return
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    dispatch(updateStatus({
      taskId,
      statusId: destination.droppableId
    }, projectId, taskId))
  }


  const renderListTask = () => {
    return <DragDropContext onDragEnd={handleDragEnd}>
      {projectDetail?.lstTask?.map((task, index) => {
        return <Droppable key={index} droppableId={task.statusId}>
          {(provided) => {
            return <div key={index} className="min-w-full h-auto mr-4 mt-5 bg-gray-100" >
              <div className="p-3">{task.statusName}</div>
              <div className="list-group list-group-flush" ref={provided.innerRef} {...provided.droppableProps}>
                {task?.lstTaskDeTail?.map((taskDetail, index) => {
                  return <Draggable key={taskDetail?.taskId.toString()} index={index} draggableId={JSON.stringify({ taskId: taskDetail?.taskId, projectId: taskDetail?.projectId })}>
                    {(provided) => {
                      return (
                        <div key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          className="list-group-item focus:outline-none drop-shadow-lg bg-white mx-2 mb-2"
                          data-toggle="modal"
                          data-target="#infoModal"
                          onClick={() => { dispatch(getTaskDetail(taskDetail?.taskId)) }}
                        >
                          <p>{taskDetail.taskName}</p>
                          <div className="flex justify-between">
                            <div className="block-left mr-2" >
                              <p>{taskDetail?.priorityTask.priority}</p>
                            </div>
                            <div className="block-right">
                              {taskDetail?.assigness?.map((assign, index) => {
                                return <Avatar key={index} taskId={taskDetail?.taskId} className="mr-2 mb-2" src={assign.avatar} />
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    }}
                  </Draggable>
                })}
                {provided.placeholder}
              </div>
            </div>
          }}
        </Droppable>
      })}
    </DragDropContext>
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {renderListTask()}
      <InfoModal />
    </div>
  );
}
