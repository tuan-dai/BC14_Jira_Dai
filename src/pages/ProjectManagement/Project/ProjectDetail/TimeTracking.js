import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Progress } from "antd";
import { updateTask } from '../../../../redux/actions/Task';
import { useFormik } from 'formik';


export default function TimeTracking() {

    const dispatch = useDispatch();
    const { taskDetail } = useSelector((state) => state.Task_Reducer);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            originalEstimate: taskDetail?.originalEstimate,
            timeTrackingSpent: taskDetail?.timeTrackingSpent,
            timeTrackingRemaining: taskDetail?.timeTrackingRemaining
        }
    })
    const { values } = formik

    return (
        <form>
            <div className=" form-group my-4">
                <p className="text-md text-gray-700 font-medium -mb-0">
                    ORIGINAL ESTIMATE (HOURS)
                </p>
                <input type="text" className="bg-gray-200 border-none form-control" name='originalEstimate' value={values.originalEstimate}
                    onChange={e => {
                        const { value } = e.target
                        let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                        const _originalEstimate = { ...taskDetail, originalEstimate: value, listUserAsign }
                        dispatch(updateTask(_originalEstimate, taskDetail?.taskId))
                    }} />
            </div>
            <div className="time-tracking">
                <p className="text-md text-gray-700 font-medium -mb-0">TIME TRACKING</p>
                <div className="flex">
                    <div className="text-xl"><i className="fa fa-clock" /></div>
                    <div style={{ width: "100%" }}>
                        <Progress max={taskDetail?.originalEstimate}
                            percent={(taskDetail?.timeTrackingSpent) / (taskDetail?.originalEstimate) * 100} showInfo={false} />
                        <div className="flex justify-between ">
                            <p className="logged">{taskDetail?.timeTrackingSpent}h logged</p>
                            <p className="estimate-time">{taskDetail?.originalEstimate}h estimated</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mb-3">
                    <div>
                        <label className="text-sm">Time spent (hours)</label>
                        <input className="bg-gray-200 rounded-sm w-10/12 px-2 py-1" type="number" min="0" name='timeTrackingSpent' value={values.timeTrackingSpent}
                            onChange={e => {
                                let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                                const obj = { ...taskDetail, timeTrackingSpent: e.target.value, listUserAsign }
                                dispatch(updateTask(obj, taskDetail?.taskId))
                            }} />
                    </div>

                    <div>
                        <label className="text-sm">Time remaining (hours)</label>
                        <input className="bg-gray-200 rounded-sm w-10/12 px-2 py-1" type="number" min="0" name='timeTrackingRemaining' value={values.timeTrackingRemaining}
                            onChange={e => {
                                let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                                const obj = { ...taskDetail, timeTrackingRemaining: e.target.value, listUserAsign }
                                dispatch(updateTask(obj, taskDetail?.taskId))
                            }} />
                    </div>
                </div>
            </div>
        </form>
    )
}
