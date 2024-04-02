import { TextField, MenuItem } from '@mui/material';
import {
  MRT_RowData,
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from 'material-react-table';

export type CellSelectInputProps<T extends MRT_RowData> = {
  tableProps: {
    cell: MRT_Cell<T>;
    column: MRT_Column<T>;
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
  };
  name?: string;
  value?: unknown;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CellSelectInput = <T extends MRT_RowData>({
  tableProps,
  name,
  value,
  onChange,
}: CellSelectInputProps<T>): JSX.Element => {
  const { editSelectOptions } = tableProps.column.columnDef;
  const options = (() => {
    if (typeof editSelectOptions === 'function') {
      return editSelectOptions(tableProps);
    }
    return editSelectOptions || [];
  })();

  const optionList = options.map((v) => {
    if (typeof v === 'string') {
      return {
        label: v,
        value: v,
      };
    }
    return {
      label: v.label,
      value: String(v.value),
    };
  });

  return (
    <TextField
      select
      variant="standard"
      size="small"
      fullWidth
      name={name}
      InputProps={{
        disableUnderline: true,
      }}
      value={value}
      onChange={onChange}
    >
      {optionList.map((v) => (
        <MenuItem key={v.value} value={v.value}>
          {v.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CellSelectInput;
