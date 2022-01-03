import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCatagory } from "../../../redux/actions/getProjectCatagory";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import *as Yup from 'yup';
import { createProject } from "../../../redux/actions/getAllProject";
import { NavLink } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";

export default function CreateProject(props) {
  //GET PROJECT CATAGORY
  const projectCatagory = useSelector(
    (state) => state.ProjectCategory_Reducer.data
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectCatagory());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const catagory = () => {
    return projectCatagory?.map(project => {
      return (
        <Fragment key={project.id}>
          <option value={project.id}>{project.projectCategoryName}</option>
        </Fragment>
      );
    });
  };


  //CREATE PROJECT
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: projectCatagory?.[0].id,
    },
    onSubmit: (values) => {
      dispatch(createProject(values, props.history))
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('*Name is required'),
    })
  });
  const { handleChange, handleSubmit, setFieldValue, errors, touched } = formik;
  const handleEditorChange = (e) => {
    setFieldValue("description", e.target.getContent());
  };

  return (
    <div className="create-project w-full p-5">
      <div className="flex items-center gap-3 mb-4">
        <EditFilled className="text-xl" />
        <span className="text-3xl font-medium">Create Project</span>
      </div>

      <form onSubmitCapture={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="projectName"
            onChange={handleChange}
          />
          {errors.projectName && touched.projectName && <p className='text-red-500'>{errors.projectName}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <Editor
            name="description"
            apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <select className="form-control">{catagory()}</select>
        </div>

        <button
          className="btn btn-primary" type="submit">Create project
        </button>
        <NavLink to="/project" className="ml-3 text-black hover:bg-gray-200  px-3 py-2.5 rounded-sm hover:text-black">Cancel</NavLink>
      </form>
    </div>
  );
}
