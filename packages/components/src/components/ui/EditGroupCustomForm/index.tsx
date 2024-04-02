import {
  Box,
  Divider,
  FormControl,
  FormControlProps,
  TextField,
  Typography,
} from '@mui/material';
import InvestorRelationsGoals from './InvestorRelationsGoals';

export type EditGroupFormProps = Omit<
  FormControlProps<'form'>,
  'defaultValue'
> & {
  readOnly?: boolean;
  defaultValue?: Dictionary<string, string | number | undefined>;
};

const EditGroupForm = ({
  readOnly,
  defaultValue,
  ...formProps
}: EditGroupFormProps) => (
  <FormControl
    component="form"
    fullWidth
    sx={{ display: 'flex', gap: 4 }}
    variant="filled"
    {...formProps}
  >
    <Box>
      <Typography component="h2" variant="h5" mb={1}>
        カスタム指標
      </Typography>
      <Divider />
    </Box>
    <InvestorRelationsGoals defaultValue={defaultValue} />
    <Box>
      <Typography component="h3" variant="h6" mb={1}>
        流通株式数の算出
      </Typography>
    </Box>
    <TextField
      name="listedShares"
      label="上場株式数"
      defaultValue={defaultValue?.listedShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
    <TextField
      name="majorHolderShares"
      label="主要株式所有の株式"
      helperText="未入力の場合0が設定されます。"
      defaultValue={defaultValue?.majorHolderShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
    <TextField
      name="officerHeldShares"
      label="役員等所有株式数"
      helperText="未入力の場合0が設定されます。"
      defaultValue={defaultValue?.officerHeldShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
    <TextField
      name="treasuryShares"
      label="自己株式数"
      helperText="未入力の場合0が設定されます。"
      defaultValue={defaultValue?.treasuryShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
    <TextField
      name="corporationHeldShares"
      label="国内の普通銀行、保険会社、事業法人等が所有する株式"
      helperText="未入力の場合0が設定されます。"
      defaultValue={defaultValue?.corporationHeldShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
    <TextField
      name="otherFixedShares"
      label="その他当取引所が固定的と認める株式"
      helperText="未入力の場合0が設定されます。"
      defaultValue={defaultValue?.otherFixedShares}
      type="number"
      inputProps={{
        readOnly,
        min: 0,
      }}
    />
  </FormControl>
);

export default EditGroupForm;
