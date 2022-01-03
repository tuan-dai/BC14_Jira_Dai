import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button } from "antd";
import { getComment, insertComment } from "../../../redux/actions/comment";

export default function Comment() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getComment(taskDetail?.taskId))
    }, []);

    const { taskDetail } = useSelector((state) => state.Task_Reducer);
    const { comment } = useSelector(state => state.comment_Reducer)

    const [visible, setState] = useState(false)
    const [_comment, setComment] = useState({ newComment: '' })

    const renderComment = () => {
        return comment?.map((item, index) => {
            return <p key={index}>{item.contentComment}</p>
        })
    }

    return (
        <div className="comment">
            <p className="font-medium text-lg">Comment</p>
            <div className="block-comment flex">
                <Avatar src="/img/download (1).jfif" />
                <div className="input-comment form-group ml-2">
                    <div onClick={() => { setState(true) }}>
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Add a comment ..."
                            onChange={e => setComment({ newComment: e.target.value })} />
                    </div>
                    {visible
                        ? <div>
                            <Button className="mr-3 my-2" type="primary">Save</Button>
                            <Button onClick={() => setState(false)}>Cancel</Button>
                        </div> : ''}
                    <p>
                        <span className="text-gray-500 font-medium mr-2">
                            Protip:
                        </span>
                        <span>press<span
                            style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                            }}>M
                        </span>
                            to comment
                        </span>
                    </p>
                </div>
            </div>
            <div className="lastest-comment">
                <div className="comment-item">
                    <div className="display-comment flex">
                        <Avatar src="/img/download (1).jfif" />
                        <div className="input-comment form-group ml-2">
                            <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>{renderComment()}</p>
                            <div>
                                <button className="text-gray-500 mr-3">
                                    Edit
                                </button>
                                <button className="text-gray-500">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
