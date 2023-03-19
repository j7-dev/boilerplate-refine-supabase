import React, { useState } from "react";
import { EditFilled, SaveFilled, CloseOutlined } from "@ant-design/icons";
import { Form, Button } from "antd";
import { BaseRecord } from "@refinedev/core";

const useUpdateRecord = <FormatDataType extends BaseRecord>({
  rowKey,
  onFinish,
}: {
  rowKey: keyof FormatDataType;
  onFinish?: (_values: { [key: string]: any; key: React.Key }) => void;
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    record: FormatDataType;
    cellInput: {
      el: React.ReactNode;
      required?: boolean;
      message?: string;
    };
    dataIndex: string;
    index: number;
    children: React.ReactNode;
  }

  const isEditing = (record: FormatDataType) => record?.[rowKey] === editingKey;

  const edit = (record: FormatDataType) => {
    // form.setFieldsValue({ name: '', age: '', address: '', ...record })

    setEditingKey((record?.[rowKey] as React.Key).toString());
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    const values = {
      ...form.getFieldsValue(),
      key,
    };

    try {
      if (!!onFinish) {
        onFinish(values);
      }
      setEditingKey("");
    } catch (error) {
      setEditingKey("");
    }
  };

  const renderEditableCell: React.FC<EditableCellProps> = ({
    record,
    cellInput,
    dataIndex,
    index: _index,
    children,
    ...restProps
  }) => {
    const editing = isEditing(record);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: cellInput?.required || false,
                message: cellInput?.message || "",
              },
            ]}
            initialValue={record?.[dataIndex]}
          >
            {cellInput?.el || <></>}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const renderForm = ({ children }: { children: React.ReactNode }) => {
    return (
      <Form form={form} component={false}>
        {children}
      </Form>
    );
  };

  const components = {
    body: {
      cell: renderEditableCell,
    },
  };

  const renderEditButton = (record: FormatDataType) => {
    const editable = isEditing(record);
    return editable ? (
      <div className="flex flex-nowrap">
        <Button
          onClick={() => save((record?.[rowKey] as React.Key) || "")}
          type="primary"
          shape="circle"
          icon={
            <SaveFilled className="text-[0.625rem] relative -top-[0.1rem]" />
          }
          size="small"
          className="shadow-none mr-2"
        />
        <Button
          onClick={cancel}
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
    ) : (
      <Button
        disabled={editingKey !== ""}
        onClick={() => edit(record)}
        type="primary"
        shape="circle"
        icon={<EditFilled className="text-[0.625rem] relative -top-[0.1rem]" />}
        size="small"
        className="shadow-none"
      />
    );
  };

  return {
    FormProvider: renderForm,
    editableTableProps: {
      components,
      rowClassName: "editable-row",
    },
    editingKey,
    renderEditButton,
    form,
    isEditing,
    edit: (record: FormatDataType) => edit(record),
    save: (recordKey: React.Key) => save(recordKey),
    cancel,
  };
};

export default useUpdateRecord;
