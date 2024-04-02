import {
  Circle as CircleIcon,
  FmdGoodOutlined as FmdGoodOutlinedIcon,
} from '@mui/icons-material';
import { Checkbox, MenuItem, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import MenuButton from '~/components/ui/MenuButton';
import {
  NewsMarkerType,
  newsMarkerPinConfigs,
  newsMarkerTypes,
} from '~/components/ui/StockGraphEditor';
import { NewsOptionMenuProps } from '~/components/ui/GraphEditorTopToolbar/types';

const NewsOptionMenu: React.FC<NewsOptionMenuProps> = ({
  selectedNewsTypes = [],
  onChange,
}) => {
  const checkState = useMemo(() => {
    if (!selectedNewsTypes.length) return 'unchecked';
    if (newsMarkerTypes.every((key) => selectedNewsTypes.includes(key)))
      return 'checked';
    return 'indeterminate';
  }, [selectedNewsTypes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value as NewsMarkerType | 'all';
    const list: NewsMarkerType[] = [];
    const payload = { target, list };

    if (target === 'all') {
      payload.list = checkState === 'checked' ? [] : [...newsMarkerTypes];
    } else if (selectedNewsTypes.includes(target)) {
      payload.list = selectedNewsTypes.filter((type) => type !== target);
    } else {
      payload.list = [...selectedNewsTypes, target];
    }

    onChange?.(e, payload);
  };

  return (
    <MenuButton
      label="ニュース"
      buttonProps={{
        startIcon: <FmdGoodOutlinedIcon />,
      }}
      onChange={handleChange}
    >
      <MenuItem component="label">
        <Checkbox
          size="small"
          disableRipple
          sx={{ p: 0, mr: 1 }}
          name="newsType"
          value="all"
          checked={checkState === 'checked'}
          indeterminate={checkState === 'indeterminate'}
        />
        すべて表示
      </MenuItem>

      {newsMarkerPinConfigs.map((config) => (
        <MenuItem key={config.type} component="label" sx={{ pl: 4 }}>
          <Checkbox
            size="small"
            disableRipple
            sx={{ p: 0, mr: 1 }}
            name="newsType"
            value={config.type}
            checked={selectedNewsTypes.includes(config.type)}
          />
          <Stack
            sx={{
              alignItems: 'center',
              mr: 1,
            }}
          >
            <CircleIcon
              htmlColor={config.markerColor}
              sx={{ width: 16, height: 16 }}
            />
          </Stack>
          {config.label}
        </MenuItem>
      ))}
    </MenuButton>
  );
};

export default NewsOptionMenu;
