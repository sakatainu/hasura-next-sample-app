import { Box, FormControlProps, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import ProgressBox from '~/components/ui/ProgressBox';
import useMasterTypes from '~/hooks/model/useMasterTypes';

const fieldSort = [
  'close',
  'volume',
  'value',
  'forecastPer',
  'pbr',
  'liquidityMarketCapitalization',
  'marketCapitalization',
];

export type EditGroupFormProps = Omit<
  FormControlProps<'form'>,
  'defaultValue'
> & {
  defaultValue?: Dictionary<string, string | number | undefined>;
};

const InvestorRelationsGoals = ({
  defaultValue,
}: EditGroupFormProps): JSX.Element => {
  const { fetching, data } = useMasterTypes();

  const types = useMemo(
    () => data?.investorRelationsGoalTypes || [],
    [data?.investorRelationsGoalTypes]
  );

  const orderedGoalTypes = useMemo(
    () =>
      fieldSort.flatMap((v) => {
        const target = types.find(({ code }) => code === v);
        if (!target) return [];
        return [target];
      }),
    [types]
  );

  return (
    <>
      <Box>
        <Typography component="h3" variant="h6" mb={1}>
          目標数値の設定
        </Typography>
      </Box>
      {fetching ? (
        <ProgressBox />
      ) : (
        orderedGoalTypes.map(({ code, label }) => (
          <TextField
            key={code}
            name={code}
            label={label.at(0)?.name}
            type="number"
            inputProps={{
              min: 0,
            }}
            defaultValue={defaultValue?.[code] ?? ''}
          />
        ))
      )}
    </>
  );
};

export default InvestorRelationsGoals;
