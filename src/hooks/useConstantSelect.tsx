import React, { useState } from "react";
import { Select, Tooltip } from "antd";
import { IMappingConstant } from "types";
import { SelectProps } from "antd/lib/select";
import { TooltipProps } from "antd/lib/tooltip";

const useConstantSelect = ({
  mappingConstants,
  hasTooltip = false,
  tooltipProps = {
    title: "Please select",
  },
  selectProps = {
    style: { width: 120 },
    defaultValue: "",
  },
}: {
  mappingConstants: IMappingConstant<string>[];
  hasTooltip?: boolean;
  tooltipProps?: TooltipProps;
  selectProps?: SelectProps;
}) => {
  const [value, setValue] = useState<string>(selectProps?.defaultValue || "");
  const handleChange = (value: string) => {
    setValue(value);
  };

  const defaultSelectProps = {
    ...selectProps,
    options: mappingConstants.map((c) => ({
      label: c.label,
      value: c.value,
    })),
    onChange: handleChange,
  };

  const renderSelect = () => {
    return (
      <>
        {hasTooltip ? (
          <Tooltip {...tooltipProps}>
            <Select {...defaultSelectProps} />
          </Tooltip>
        ) : (
          <Select {...defaultSelectProps} />
        )}
      </>
    );
  };

  return {
    value,
    setValue,
    renderSelect,
    selectProps: defaultSelectProps,
  };
};

export default useConstantSelect;
