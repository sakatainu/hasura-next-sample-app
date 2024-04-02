import {
  ChangeCircleOutlined as ChangeCircleOutlinedIcon,
  CloudDownload as CloudDownloadIcon,
  Download as DownloadIcon,
  QueryStatsRounded as QueryStatsRoundedIcon,
  VisibilityOff as VisibilityOffIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import {
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Link as MuiLink,
  Paper,
  Radio,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import { useToggle } from 'react-use';
import ElementControl from '~/components/ui/ElementControl';
import IndicatorGoalMenu from '~/components/ui/GraphEditorTopToolbar/IndicatorGoalMenu';
import NewsOptionMenu from '~/components/ui/GraphEditorTopToolbar/NewsOptionMenu';
import MenuButton from '~/components/ui/MenuButton';
import Row from '~/components/ui/Row';
import { entries, keys, removeLegalType } from '~/utils';
import TechnicalOptionMenu from '~/components/ui/GraphEditorTopToolbar/TechnicalOptionMenu';
import {
  GraphEditorTopToolbarProps,
  historicalTypeLabels,
  indicatorOptionGroupLabel,
  seriesTypeIcon,
  stockIndexLabel,
  stockPriceStyleLabels,
} from './types';

export * from './types';

const GraphEditorTopToolbar = ({
  loading,
  value: {
    stockIssue,
    selectedStockPriceStyle = 'candlestick',
    selectedIndicator,
    selectedTechnicals = [],
    selectedStockIndexes = [],
    selectedNewsTypes = [],
    showPrivateCompany = true,
    showIndicatorGoal = false,
  } = {},
  config: {
    isStockPricePermanent = false,
    disableStockPriceLabel = false,
    disableTechnical = false,
    disableIndicatorGoal = false,
    stockPriceStyle = [],
    indicatorOptions = {},
    stockIndexTypes = [],
    hideTechnicalOption = false,
    showIndicatorGoalOption = false,
    hideStockIssue = false,
    hideNewsOption = false,
  } = {},
  items = [],
  onChangeSeriesType,
  onChangeIndicator,
  onChangeStockIndexes,
  onChangeTechnicals,
  onChangeNewsTypes,
  onClickShowPrivateCompany,
  onCsvDownload,
  onClickChangeStockIssue,
  onClickEditLiquidityShareSource,
  onChangeShowIndicatorGoal,
  onClickIndicatorGoalSetting,
}: GraphEditorTopToolbarProps) => {
  const downloadMenuRef = useRef<HTMLButtonElement>(null);
  const [openDownloadMenu, setOpenDownloadMenu] = useToggle(false);

  const handleClickCsvDownload = () => onCsvDownload?.();

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        px: 2,
        gap: 0.5,
      }}
    >
      <Row
        sx={{
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <ElementControl hide={hideStockIssue}>
          {onClickChangeStockIssue && (
            <IconButton
              color="primary"
              sx={{ mr: 1 }}
              onClick={onClickChangeStockIssue}
            >
              <ChangeCircleOutlinedIcon />
            </IconButton>
          )}
          <Tooltip title={stockIssue?.name}>
            <Typography
              sx={{
                width: 260,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {stockIssue?.code
                ? `(${stockIssue.code}) ${removeLegalType(stockIssue.name)}`
                : '銘柄を選択してください'}
            </Typography>
          </Tooltip>
          {
            // 機能提供しているなら表示の意
            onClickShowPrivateCompany && (
              <IconButton
                onClick={onClickShowPrivateCompany}
                color="primary"
                sx={{ mr: 1 }}
              >
                {showPrivateCompany ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            )
          }
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 1 }}
          />
        </ElementControl>
        {Boolean(stockPriceStyle.length) && (
          <MenuButton
            label={stockPriceStyleLabels[selectedStockPriceStyle]}
            buttonProps={{
              startIcon: seriesTypeIcon[selectedStockPriceStyle],
              disabled: disableStockPriceLabel,
            }}
          >
            {stockPriceStyle.map((v) => (
              <MenuItem key={v} onClick={(e) => onChangeSeriesType?.(v, e)}>
                <ListItemIcon>{seriesTypeIcon[v]}</ListItemIcon>
                <ListItemText>{stockPriceStyleLabels[v]}</ListItemText>
              </MenuItem>
            ))}
          </MenuButton>
        )}
        {Boolean(keys(indicatorOptions).length) && (
          <MenuButton
            label={
              selectedIndicator
                ? historicalTypeLabels[selectedIndicator]
                : '指標'
            }
            buttonProps={{
              startIcon: <QueryStatsRoundedIcon />,
            }}
            onChange={onChangeIndicator}
          >
            {entries(indicatorOptions).flatMap(
              ([indicatorGroupName, indicatorNames]) => [
                <ListSubheader key={indicatorGroupName}>
                  {indicatorOptionGroupLabel[indicatorGroupName]}
                </ListSubheader>,
                ...indicatorNames.map((indicatorName) => (
                  <MenuItem key={indicatorName} component="label">
                    <Radio
                      size="small"
                      disableRipple
                      sx={{ p: 0, mr: 1 }}
                      value={indicatorName}
                      name="indicator"
                      checked={indicatorName === selectedIndicator}
                    />
                    <Stack>
                      <span>
                        {indicatorName === 'pbr'
                          ? `${historicalTypeLabels[indicatorName]}（β機能）`
                          : historicalTypeLabels[indicatorName]}
                      </span>
                      {/* TODO: config化 */}
                      {indicatorName === 'liquidityMarketCapitalization' && (
                        <Typography variant="caption">
                          現在の
                          <MuiLink
                            component="button"
                            underline="hover"
                            onClick={onClickEditLiquidityShareSource}
                          >
                            設定
                          </MuiLink>
                          を確認する
                        </Typography>
                      )}
                    </Stack>
                  </MenuItem>
                )),
              ]
            )}
          </MenuButton>
        )}
        {hideTechnicalOption ? null : (
          <TechnicalOptionMenu
            selectedIndicator={selectedIndicator}
            selectedTechnicals={selectedTechnicals}
            isStockPricePermanent={isStockPricePermanent}
            disableTechnical={disableTechnical}
            onChange={onChangeTechnicals}
          />
        )}
        {Boolean(stockIndexTypes.length) && (
          <MenuButton label="指数比較" onChange={onChangeStockIndexes}>
            {stockIndexTypes.map((v) => (
              <MenuItem key={v} component="label">
                <Checkbox
                  size="small"
                  disableRipple
                  sx={{ p: 0, mr: 1 }}
                  value={v}
                  name="stockIndex"
                  checked={selectedStockIndexes.includes(v)}
                />
                {stockIndexLabel[v]}
              </MenuItem>
            ))}
          </MenuButton>
        )}
        <ElementControl hide={hideNewsOption}>
          <NewsOptionMenu
            selectedNewsTypes={selectedNewsTypes}
            onChange={onChangeNewsTypes}
          />
        </ElementControl>
        {showIndicatorGoalOption && (
          <IndicatorGoalMenu
            value={{
              showIndicatorGoal,
            }}
            disableIndicatorGoal={disableIndicatorGoal}
            onChange={onChangeShowIndicatorGoal}
            onClickIndicatorGoalSetting={onClickIndicatorGoalSetting}
          />
        )}
        {items}
      </Row>
      <IconButton
        disabled={loading}
        ref={downloadMenuRef}
        sx={{
          display: onCsvDownload ? 'flex' : 'none',
        }}
        onClick={() => setOpenDownloadMenu(true)}
      >
        {loading ? <CircularProgress size={18} /> : <CloudDownloadIcon />}
      </IconButton>
      <Menu
        anchorEl={downloadMenuRef.current}
        open={openDownloadMenu}
        onClose={() => setOpenDownloadMenu(false)}
      >
        <MenuList disablePadding>
          <MenuItem onClick={handleClickCsvDownload}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>CSVダウンロード</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Paper>
  );
};

export default GraphEditorTopToolbar;
