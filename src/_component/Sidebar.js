import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'
import SearchModal from '../pages/ProjectManagement/MainBoard/SearchModal'

export default function Sidebar() {
    return (
        <Fragment>
            <SearchModal />
            <div className="sideBar">
                <div>
                    <div className="sideBar-top">
                        <div className="sideBar-icon mt-4">
                            <NavLink to='/project' className="text-3xl text-white p-3"><i className="fab fa-jira" /></NavLink>
                        </div>

                        <div className="hover:bg-blue-700 pb-1">
                            <div className="sideBar-icon flex items-center gap-2 mt-4 ml-4 text-blue-100" >
                                <span className="text-xl mr-2 cursor-pointer" data-toggle="modal" data-target="#searchModal"><i className="fa fa-search" /></span>
                                <span className="title font-extrabold">SEARCH TASKS</span>
                            </div>
                        </div>

                        <div className="sideBar-icon hover:bg-blue-700 pb-1">
                            <NavLink to="/createtask" className="flex items-center gap-2 mt-3 ml-4 text-blue-100 hover:text-blue-100">
                                <span className="text-xl mr-2"><i className="fa fa-plus" /></span>
                                <span className="title font-extrabold">CREATE TASK</span>
                            </NavLink>
                        </div>

                    </div>
                    <div className="sideBar-bottom ">
                        <div className="sideBar-icon flex items-center gap-2 ml-4 text-blue-100 absolute bottom-14 ">
                            <span className="text-xl mr-2"><i className="fa fa-question-circle" /></span>
                            <span className="title font-extrabold">ABOUT</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
