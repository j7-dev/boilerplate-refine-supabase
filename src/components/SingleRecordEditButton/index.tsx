import React, { useState } from "react";
import { EditFilled, SaveFilled, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SingleRecordEditButton = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <>
          <Button
            onClick={handleEdit}
            type="primary"
            shape="circle"
            icon={
              <EditFilled className="text-[0.625rem] relative -top-[0.1rem]" />
            }
            size="small"
            className="shadow-none"
          />
        </>
      ) : (
        <div className="flex flex-nowrap">
          <Button
            onClick={handleSave}
            type="primary"
            shape="circle"
            icon={
              <SaveFilled className="text-[0.625rem] relative -top-[0.1rem]" />
            }
            size="small"
            className="shadow-none mr-2"
          />
          <Button
            onClick={handleCancel}
            type="primary"
            shape="circle"
            icon={
              <CloseOutlined className="text-[0.625rem] relative -top-[0.1rem]" />
            }
            size="small"
            className="shadow-none"
            danger
          />
        </div>
      )}
    </>
  );
};

export default SingleRecordEditButton;
