import { SearchOutlined } from "@ant-design/icons/lib/icons";
import React from "react";

export default function Info(props) {
  const { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail?.members?.map((member, index) => {
      return (
        <div key={index}>
          <img className="rounded-full md: w-10" src={member.avatar} alt="1" />
        </div>
      );
    });
  };
  return (
    <div className="flex items-center form-group">
      <div className="mr-3 flex items-center relative">
        <span className="text-lg absolute left-3 mb-2"><SearchOutlined /></span>
        <input className="form-control sm: h-8 md:h-10 bg-gray-100 hover:bg-gray-200" />
      </div>
      <div className="flex items-center gap-2">{renderAvatar()}</div>
      <div style={{ marginLeft: 20 }} className="text">
        <button className="hover:bg-gray-200 px-2 py-1">Only My Issues</button>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        <button className="hover:bg-gray-200 px-2 py-1">Recently Updated</button>
      </div>
    </div>
  );
}
