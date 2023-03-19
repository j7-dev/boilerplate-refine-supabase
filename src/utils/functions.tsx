import { IMappingConstant } from "types";

export const getColumnFilterPros = <
  T extends {
    [key: string]: string | number | boolean;
  }
>({
  mappingConstants,
  dataIndex,
}: {
  mappingConstants: IMappingConstant<string | number | boolean>[];
  dataIndex: string;
}) => {
  const filters = mappingConstants.map((item) => ({
    text: item.label,
    value: item.value.toString(),
  }));
  const onFilter = (value: string | number | boolean, record: T) => {
    switch (typeof record[dataIndex]) {
      case "string":
        return (record[dataIndex] as string).indexOf(value as string) === 0;
      case "number":
        return record[dataIndex].toString().indexOf(value as string) === 0;
      case "boolean":
        return record[dataIndex].toString() === value;

      default:
        return false;
    }
  };

  return {
    filters,
    onFilter,
  };
};
