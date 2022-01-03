import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "antd";
import { updateTask } from '../../../../redux/actions/Task';

export default function Description() {

    const dispatch = useDispatch();
    const { taskDetail } = useSelector((state) => state.Task_Reducer);
    const [state, setState] = useState({ visible: false })
    const [text, setText] = useState(taskDetail?.description)

    return (
        <div className="description mb-4">
            <p className="font-medium text-base mb-1">Description</p>

            {state.visible
                ? <>
                    <Editor
                        name="description"
                        apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
                        initialValue={taskDetail?.description}
                        init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image",
                                "charmap print preview anchor help",
                                "searchreplace visualblocks code",
                                "insertdatetime media table paste wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic | \alignleft aligncenter alignright | \bullist numlist outdent indent | help",
                        }}
                        onEditorChange={(newtext, editor) => setText(newtext)}
                    />
                    <div className="my-3">
                        <Button className="mr-3" type="primary" onClick={() => {
                            let listUserAsign = taskDetail?.assigness?.map(item => item.id)
                            const _description = { ...taskDetail, description: text, listUserAsign }
                            dispatch(updateTask(_description, taskDetail.taskId))
                            setState({ visible: false })
                        }}>Save</Button>
                        <Button onClick={() => { setState({ visible: false }) }}>Cancel</Button>
                    </div></>
                : <div onClick={() => { setState({ visible: true }) }}>
                    {ReactHtmlParser(taskDetail?.description)}
                </div>}
        </div>
    )
}
