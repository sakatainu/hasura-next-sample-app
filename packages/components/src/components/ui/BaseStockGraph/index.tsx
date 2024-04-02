import { Box } from '@mui/system';
import { deepmerge } from '@mui/utils';
import EChartsReact, { EChartsReactProps } from 'echarts-for-react';
import { ComponentProps } from 'react';

const mergeOption = {
  replaceMerge: ['xAxis', 'yAxis', 'series', 'dataset'],
};

export type BaseStockGraphProps = {
  boxProps?: ComponentProps<typeof Box>;
  echartProps: EChartsReactProps;
};

const BaseStockGraph = ({ boxProps, echartProps }: BaseStockGraphProps) => (
  <Box
    {...boxProps}
    sx={deepmerge(
      {
        position: 'relative',
        width: 1,
        height: 1,
      },
      boxProps?.sx
    )}
  >
    <EChartsReact
      // https://github.com/hustcc/echarts-for-react/issues/478
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      notMerge={mergeOption as any}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...echartProps}
    />
  </Box>
);

export default BaseStockGraph;
