import { Functions as FunctionsIcon } from '@mui/icons-material';
import { Checkbox, MenuItem } from '@mui/material';
import React from 'react';
import MenuButton from '~/components/ui/MenuButton';
import { CustomSyntheticEventHandler } from '~/utils';

export const aggregateType = ['average'] as const;
export type AggregateType = (typeof aggregateType)[number];
export const aggregateLabel: Record<AggregateType, string> = {
  average: '平均値',
};

export const isAggregateType = (v: string): v is AggregateType =>
  aggregateType.includes(v);

export type AggregateMenuProps = {
  value?: AggregateType[];
  onChange?: CustomSyntheticEventHandler<
    HTMLDivElement,
    Event,
    {
      target: AggregateType[];
    }
  >;
};

const AggregateMenu: React.FC<AggregateMenuProps> = ({
  value = [],
  onChange,
}) => {
  const handleChange: React.FormEventHandler<HTMLDivElement> = (e) => {
    if (!onChange) return;
    const eventTarget = e.target;
    if (!(eventTarget instanceof HTMLInputElement)) return;

    const currentValue = eventTarget.value;
    if (!isAggregateType(currentValue)) throw new Error('invalid value');

    const newValue = (() => {
      if (value.includes(currentValue)) {
        return value.filter((v) => v !== currentValue);
      }

      return [...value, currentValue];
    })();

    (async () =>
      onChange({
        ...e,
        type: 'change',
        payload: { target: newValue },
      }))();
  };

  return (
    <MenuButton
      label="リスト集計"
      buttonProps={{
        startIcon: <FunctionsIcon />,
      }}
      onChange={handleChange}
    >
      {aggregateType.map((v) => (
        <MenuItem key={v} component="label">
          <Checkbox
            size="small"
            disableRipple
            sx={{ p: 0, mr: 1 }}
            value={v}
            name="aggregate"
            checked={value.includes(v)}
          />
          {aggregateLabel[v]}
        </MenuItem>
      ))}
    </MenuButton>
  );
};

export default AggregateMenu;
