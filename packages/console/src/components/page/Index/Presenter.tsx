import { SelectGroupsQuery } from '@/generated/graphql';
import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import AsyncPresenter from '~/components/ui/AsyncPresenter';
import Row from '~/components/ui/Row';

export type PresenterProps = {
  loading?: boolean;
  value?: SelectGroupsQuery['groups'];
  onClickAdd?: () => void;
};

const Presenter = ({
  loading = false,
  value = [],
  onClickAdd,
}: PresenterProps): JSX.Element => (
  <Box sx={{ flexGrow: 1, p: 2 }}>
    <Row>
      <Box>
        <Button variant="outlined" onClick={onClickAdd}>
          追加
        </Button>
      </Box>
    </Row>
    <AsyncPresenter loading={loading}>
      <Stack py={2}>
        {value.length ? (
          value.map((v) => <Paper key={v.id}>{v.contract?.maxUsers}</Paper>)
        ) : (
          <Typography>0件です。</Typography>
        )}
      </Stack>
    </AsyncPresenter>
  </Box>
);

export default Presenter;
