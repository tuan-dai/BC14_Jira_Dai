import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPriority, updateTask } from '../../../../redux/actions/Task'


export default function Priority() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPriority());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const { taskDetail } = useSelector((state) => state.Task_Reducer);
    const { priority } = useSelector((state) => state.Task_Reducer);

    const renderPriority = () => {
        return priority?.map((item, index) => {
            return (
                <option key={index} value={item.priorityId}>
                    {item.priority}
                </option>
            );
        });
    };

    return (
        <div className="priority mb-4">
            <p className="text-md text-gray-700 font-medium -mb-0">PRIORITY</p>
            <select className="text-md bg-gray-200 p-2 rounded-sm focus:outline-none"
                onChange={e => {
                    let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                    const newPriority = { ...taskDetail, priorityId: e.target.value, listUserAsign }
                    dispatch(updateTask(newPriority, taskDetail?.taskId))
                }}>
                {renderPriority()}
            </select>
        </div>
    )
}
