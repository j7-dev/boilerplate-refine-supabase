import { z } from "zod";
import { BaseRecord } from "@refinedev/core";
import { TableProps } from "antd";

// import { BaseRecord } from '@pankod/refine-core'

export function safeParse<DataType = BaseRecord>({
  ZDataType,
  tableProps,
}: {
  ZDataType: z.ZodObject<z.ZodRawShape>;
  tableProps: TableProps<DataType>;
}): TableProps<DataType> {
  const validation = ZDataType.array().safeParse(tableProps?.dataSource);

  const parsedTableProps = {
    ...tableProps,
    dataSource: validation.success ? tableProps?.dataSource : [],
  };

  if (!validation.success) {
    console.log("validation error", validation);
  }

  return parsedTableProps;
}
