import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Select } from "antd";
import { getTaskDetail, removeUserTask, updateTask } from '../../../../redux/actions/Task';
import { getProjectDetail } from '../../../../redux/actions/getProjectDetail';

export default function Assigness() {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectDetail(taskDetail?.projectId))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const { taskDetail } = useSelector((state) => state.Task_Reducer);
    const { projectDetail } = useSelector(state => state.getProjectDetail_Reducer)

    const renderAssigness = () => {
        return taskDetail?.assigness?.map((assign, index) => {
            return (
                <div key={index} className="bg-gray-200 md:w-full px-2 rounded-sm py-1
                flex gap-3 justify-evenly items-center cursor-pointer"
                    onClick={() => {
                        dispatch(
                            removeUserTask({
                                taskId: taskDetail.taskId,
                                userId: assign.id,
                            }, taskDetail?.taskId)
                        );
                    }}>
                    <img className='w-6 rounded-full' src={assign.avatar} alt='' />
                    {<span>{assign.name.substr(0, 6).trim()}</span>}
                    <i className="fa fa-times"></i>
                </div>
            );
        });
    };


    return (
        <div className=" mb-4">
            <p className="text-md text-gray-700 font-medium -mb-0">ASSIGNEES</p>
            <div className="grid grid-cols-2 gap-3 mr-12 items-center">
                {renderAssigness()}
                <div>
                    <Select
                        style={{ color: 'blue' }}
                        value="+ Add more"
                        bordered={false}
                        showArrow={false}
                        options={projectDetail?.members?.filter(mem => {
                            let index = taskDetail?.assigness.findIndex(assign => mem.userId === assign.id)
                            if (index !== -1) {
                                return false
                            } return true
                        }).map(mem => {
                            return { label: mem.name, value: mem.userId }
                        })}
                        onSelect={value => {
                            let mem = projectDetail?.members.find(mem => mem.userId === value)
                            mem = { ...mem, id: mem.userId }
                            taskDetail.assigness = [...taskDetail?.assigness, mem]

                            //CREATE listUserAsign
                            let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                            let obj = { ...taskDetail, listUserAsign }
                            dispatch(updateTask(obj, taskDetail?.taskId))
                            dispatch(getTaskDetail(taskDetail?.taskId))
                            dispatch(getProjectDetail(taskDetail?.projectId))
                        }}
                    ></Select>

                </div>
            </div>
        </div>
    )
}
