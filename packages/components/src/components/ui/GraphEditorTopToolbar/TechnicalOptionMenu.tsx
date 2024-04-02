import { AnalyticsOutlined as AnalyticsOutlinedIcon } from '@mui/icons-material';
import { Checkbox, ListItemText, ListSubheader, MenuItem } from '@mui/material';
import MenuButton from '~/components/ui/MenuButton';
import { TechnicalType } from '~/hooks/model/useStockHistorical';
import {
  IndicatorOptionName,
  historicalTypeLabels,
  technicalTypeMap,
} from '~/components/ui/GraphEditorTopToolbar/types';

export type TechnicalOptionMenuProps = {
  isStockPricePermanent?: boolean;
  disableTechnical?: boolean;
  selectedIndicator?: IndicatorOptionName;
  selectedTechnicals?: TechnicalType[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TechnicalOptionMenu = ({
  isStockPricePermanent,
  disableTechnical,
  selectedIndicator,
  selectedTechnicals = [],
  onChange,
}: TechnicalOptionMenuProps): JSX.Element => {
  const renderPermanent = () => {
    if (!isStockPricePermanent) return null;

    return [
      <ListSubheader key="stockPrice"> 株価 </ListSubheader>,
      ...(technicalTypeMap.close?.map((technicalType) => (
        <MenuItem key={technicalType} component="label">
          <Checkbox
            size="small"
            disableRipple
            sx={{ p: 0, mr: 1 }}
            name="technical"
            value={technicalType}
            checked={selectedTechnicals.includes(technicalType)}
          />
          {historicalTypeLabels[technicalType]}
        </MenuItem>
      )) || []),
    ];
  };

  const renderOption = () => {
    if (!selectedIndicator) {
      if (!isStockPricePermanent) {
        return (
          <ListItemText sx={{ px: 2 }}>指標を選択してください</ListItemText>
        );
      }
      return null;
    }

    const technicalOptions = technicalTypeMap[selectedIndicator];

    return [
      <ListSubheader key="selectedIndicator">
        {historicalTypeLabels[selectedIndicator]}
      </ListSubheader>,
      technicalOptions?.length ? (
        technicalOptions.map((technicalType) => (
          <MenuItem key={technicalType} component="label">
            <Checkbox
              size="small"
              disableRipple
              sx={{ p: 0, mr: 1 }}
              name="technical"
              value={technicalType}
              checked={selectedTechnicals.includes(technicalType)}
            />
            {historicalTypeLabels[technicalType]}
          </MenuItem>
        ))
      ) : (
        <ListItemText
          key="unknownOptions"
          primaryTypographyProps={{
            variant: 'caption',
          }}
          sx={{ px: 2 }}
        >
          利用できるテクニカルがありません。
        </ListItemText>
      ),
    ];
  };

  return (
    <MenuButton
      label="テクニカル"
      buttonProps={{
        disabled: disableTechnical,
        startIcon: <AnalyticsOutlinedIcon />,
      }}
      onChange={onChange}
    >
      {renderPermanent()}
      {renderOption()}
    </MenuButton>
  );
};

export default TechnicalOptionMenu;
