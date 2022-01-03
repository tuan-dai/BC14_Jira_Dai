import { ProfileOutlined } from "@ant-design/icons/lib/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../../../../redux/actions/getProjectDetail";
import Loading from '../../../../_component/Loading/Loading';
import Content from "./Content";
import Info from "./Info";

export default function ProjectDetail(props) {

    //GET PROJECT DETAIL
    const id = props.match.params.id
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProjectDetail(id))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const { projectDetail } = useSelector(state => state.getProjectDetail_Reducer)
    console.log(projectDetail)
    const { loading } = useSelector(state => state.getProjectDetail_Reducer)

    return (
        <div className="projectDetail w-full p-5">
            {loading ? <Loading /> : ''}
            <div className="flex items-center gap-3 mb-4">
                <ProfileOutlined className="text-xl" />
                <span className="text-3xl font-medium">Project {projectDetail?.projectName}</span>
            </div>

            <Info projectDetail={projectDetail} />
            <Content projectDetail={projectDetail} />
        </div>

    );
}
