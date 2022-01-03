import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatus, updateStatus } from '../../../../redux/actions/Task';

export default function Status() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllStatus());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const { taskDetail } = useSelector((state) => state.Task_Reducer);
    const { _status } = useSelector((state) => state.Task_Reducer);


    const renderStatus = () => {
        return _status?.map((item, index) => {
            return (
                <option key={index} value={item.statusId} >
                    {item.statusName}
                </option>
            );
        });
    };

    return (
        <div className='mb-2'>
            <p className="text-md text-gray-700 font-medium mb-0">STATUS</p>
            <select
                className="bg-gray-200 p-2 mb-3 w-auto rounded-sm text-md focus:outline-none"
                value={taskDetail?.statusId}
                onChange={(e) => dispatch(updateStatus({
                    taskId: taskDetail.taskId,
                    statusId: e.target.value,
                }, taskDetail.projectId, taskDetail.taskId))}>
                {renderStatus()}
            </select>
        </div>
    )
}
