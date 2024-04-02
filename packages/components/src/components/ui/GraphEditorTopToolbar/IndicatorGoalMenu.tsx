import { MultilineChartRounded as MultilineChartRoundedIcon } from '@mui/icons-material';
import {
  Checkbox,
  MenuItem,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuButton from '~/components/ui/MenuButton';
import { IndicatorGoalMenuProps } from '~/components/ui/GraphEditorTopToolbar/types';

const IndicatorGoalMenu: React.FC<IndicatorGoalMenuProps> = ({
  value,
  disableIndicatorGoal,
  onChange,
  onClickIndicatorGoalSetting,
}) => {
  const { showIndicatorGoal } = value || {};

  const handleChangeShowGoal: React.FormEventHandler<HTMLDivElement> = (e) => {
    const changeEvent: React.ChangeEvent<unknown> = {
      ...e,
      type: 'change',
    };

    onChange?.(changeEvent, {
      target: {
        showIndicatorGoal: !showIndicatorGoal,
      },
    });
  };

  const handleClickIndicatorGoalSetting = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    onClickIndicatorGoalSetting?.(e);
  };

  return (
    <MenuButton
      label="目標数値"
      buttonProps={{
        startIcon: <MultilineChartRoundedIcon />,
        disabled: disableIndicatorGoal,
      }}
      onChange={handleChangeShowGoal}
    >
      <MenuItem component="label">
        <Checkbox
          size="small"
          disableRipple
          sx={{ p: 0, mr: 1 }}
          value="showIndicatorGoal"
          name="indicator"
          checked={showIndicatorGoal}
        />
        <Stack>
          <span>目標ラインの表示</span>

          <Typography variant="caption">
            現在の
            <MuiLink
              component="button"
              underline="hover"
              onClick={handleClickIndicatorGoalSetting}
            >
              設定
            </MuiLink>
            を確認する
          </Typography>
        </Stack>
      </MenuItem>
    </MenuButton>
  );
};

export default IndicatorGoalMenu;
