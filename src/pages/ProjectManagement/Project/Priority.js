import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPriority, updatePriority } from '../../../redux/actions/Task'


export default function Priority() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPriority());
    }, []);

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
        <div className="priority mb-3">
            <p className="text-md font-medium -mb-0">PRIORITY</p>
            <select
                className="text-md bg-gray-100 p-2 rounded-sm"
                onChange={(e) =>
                    dispatch(
                        updatePriority({
                            taskId: taskDetail.taskId,
                            priorityId: e.target.value,
                        })
                    )
                }
            >
                {renderPriority()}
            </select>
        </div>
    )
}
