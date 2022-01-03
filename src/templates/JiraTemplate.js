import React from "react";
import { Redirect, Route } from "react-router-dom";
import MainMenu from "../_component/MainMenu";
import Sidebar from "../_component/Sidebar";

export const JiraTemplate = (props) => {
  let { Component, ...restProps } = props;
  return (
    <Route {...restProps} render={(propsRoute) => {
      if (localStorage.getItem("USER_LOGIN")) {
        return (
          <div className="jira">
            <Sidebar />
            <MainMenu />
            <Component {...propsRoute} />
          </div>
        )
      }
      return <Redirect to="/signin" />
    }}
    />
  );
};
