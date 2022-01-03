import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { editProject } from "../../../redux/actions/getAllProject";

import { useFormik } from "formik";
import { getProjectCatagory } from "../../../redux/actions/getProjectCatagory";
import { getProjectDetail } from '../../../redux/actions/getProjectDetail'
import { EditFilled } from "@ant-design/icons/lib/icons";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function EditProject(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  let { projectDetail } = useSelector((state) => state.getProjectDetail_Reducer);

  console.log(projectDetail)

  //GET PROJECT CATAGORY
  useEffect(() => {
    dispatch(getProjectCatagory())
    dispatch(getProjectDetail(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const projectCatagory = useSelector(state => state.ProjectCategory_Reducer.data)


  const handleEditorChange = (e) =>
    setFieldValue("description", e.target.getContent());

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectDetail?.id,
      projectName: projectDetail?.projectName,
      creator: projectDetail?.creator?.id,
      description: projectDetail?.description,
      categoryId: projectDetail?.projectCategory?.id,
    },
    onSubmit: (values) => dispatch(editProject(projectDetail?.id, values, props.history)),
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  return (
    <div className="edit-project p-5 w-full">
      <div className="flex items-center gap-3 mb-4">
        <EditFilled className="text-xl" />
        <span className="text-3xl font-medium">Edit Project</span>
      </div>

      <form onSubmitCapture={handleSubmit}>
        <div className="form-group">
          <label>Project Id</label>
          <input
            className="form-control"
            disabled={true}
            name="id"
            value={values.id}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Project Name</label>
          <input
            className="form-control"
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Project Catagory</label>
          <select
            className="form-control"
            name="categoryId"
            value={values.categoryId}
            onChange={handleChange}
          >
            {projectCatagory?.map((item, index) => { return <option key={index} value={item.id} >{item.projectCategoryName}</option> })}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <Editor
            name="description"
            apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
            initialValue={projectDetail?.description}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
            onChange={handleEditorChange}
          />
        </div>
        <button className="btn btn-primary mr-3" type="submit">Submit</button>
        <NavLink to='/project' className="rounded-md border-2 py-2 px-3  text-black 
          hover:border-blue-400 duration-500 hover:text-blue-400">Cancel</NavLink>

      </form>
    </div>
  );
}
