import { useState, useEffect } from "react";
import { BaseRecord } from "@refinedev/core";
import { TableProps } from "antd/lib/table";

function useFormatTable<DataType = BaseRecord, FormatDatatype = BaseRecord>({
  tableProps,
  formatter,
  renderKey = null,
}: {
  tableProps: TableProps<DataType>;
  formatter: (_tableProps: TableProps<DataType>) => TableProps<FormatDatatype>;
  renderKey?: any;
}): {
  formatTableProps: TableProps<FormatDatatype>;
} {
  const [formatTableProps, setFormatTableProps] = useState<
    TableProps<FormatDatatype>
  >({});

  const dependencyKey = renderKey
    ? [tableProps?.loading, renderKey]
    : [tableProps?.loading];

  useEffect(() => {
    setFormatTableProps(formatter(tableProps));
  }, dependencyKey);

  return { formatTableProps };
}

export default useFormatTable;
