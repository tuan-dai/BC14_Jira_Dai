import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { deleteComment, insertComment, updateComment } from "../../../../redux/actions/comment";
import Swal from "sweetalert2";


export default function Comment() {
    const dispatch = useDispatch();
    const { taskDetail } = useSelector((state) => state.Task_Reducer);

    const [visible, setState] = useState(false)
    const [commentVisible, setDisplay] = useState(true)

    const [_comment, setComment] = useState({ newComment: '' })
    const [content, setContent] = useState({ newContent: '' })

    const renderComment = () => {
        return taskDetail?.lstComment?.map((item, index) => {
            return (
                <div className="lastest-comment mt-2">
                    <div className="comment-item">
                        <div className="display-comment flex gap-2" >
                            <img className='rounded-full w-8 h-8' src="https://picsum.photos/id/247/200" alt='' />
                            <div className="input-comment form-group ml-2">
                                <div className="mb-2">
                                    <span className="mr-2 font-bold">Lord Gaben</span>
                                    <span>a month ago</span>
                                </div>
                                {commentVisible
                                    ? <div>
                                        <p>{item.commentContent}</p>
                                    </div>
                                    : <div>
                                        <textarea className="bg-gray-100 w-full h-16 px-3 py-2 mb-2" value={content.newContent}
                                            onChange={e => setContent({ newContent: e.target.value })} ></textarea>
                                        <Button className="mr-3" type="primary"
                                            onClick={() => {
                                                dispatch(updateComment(content.newContent, item.id, taskDetail?.taskId))
                                                setDisplay(true)
                                            }} >Save</Button>
                                        <Button onClick={() => setDisplay(true)}>Cancel</Button>
                                    </div>}

                                {commentVisible
                                    ? <div key={item?.id}>
                                        <button className="text-gray-700 font-medium mr-3 focus:outline-none"
                                            onClick={() => {
                                                setDisplay(false)
                                                setContent({ newContent: item.commentContent })
                                            }}>Edit</button>
                                        <button className="text-gray-700 font-medium focus:outline-none"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Are you sure you want to delete this comment?',
                                                    text: "Once you delete, it's gone for good.",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Delete comment'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        dispatch(deleteComment(item.id, taskDetail?.taskId))
                                                    }
                                                })
                                            }}
                                        >Delete</button>
                                    </div> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div>
            <p className="font-medium text-base">Comment</p>
            <div className="block-comment flex gap-2">
                <img className='rounded-full w-8 h-8' src="https://picsum.photos/200" alt='' />
                <div className="input-comment form-group ml-2">
                    <div onClick={() => { setState(true) }}>
                        <input
                            className="form-control mb-2 cursor-pointer"
                            type="text"
                            placeholder="Add a comment ..."
                            onChange={e => {
                                setComment({ newComment: e.target.value })
                            }} />
                    </div>
                    {visible
                        ? <div>
                            <button className="mr-3 my-2 bg-blue-500 text-white px-3 py-1 rounded-sm"
                                onClick={(e) => {
                                    const _newComment = { taskId: taskDetail?.taskId, contentComment: _comment.newComment }
                                    dispatch(insertComment(_newComment, taskDetail?.taskId))
                                    setState(false)
                                }}
                            >Save</button>
                            <Button onClick={() => setState(false)}>Cancel</Button>
                        </div>
                        : ''}

                    <div>
                        <span className="text-gray-500 font-medium mr-2">Protip:</span>
                        <span>press</span>
                        <span className=" mx-2 bg-gray-100 px-1 font-bold">M</span>
                        <span>to comment</span>
                    </div>
                </div>
            </div>

            {/* LATEST COMMENT */}
            {renderComment()}
        </div>
    )
}
