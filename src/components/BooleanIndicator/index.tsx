import React from "react";
import { Tooltip } from "antd";

const BooleanIndicator: React.FC<{
  enabled: boolean;
  trueText: React.ReactNode;
  falseText: React.ReactNode;
  node?: React.ReactNode;
}> = ({ enabled, trueText, falseText, node }) => {
  return (
    <Tooltip title={enabled ? trueText : falseText}>
      {!!node ? (
        node
      ) : (
        <div className="flex justify-center">
          <div
            className={`${
              enabled ? "bg-teal-500" : "bg-rose-500"
            } w-3 h-3 rounded-full`}
          ></div>
        </div>
      )}
    </Tooltip>
  );
};

export default BooleanIndicator;
