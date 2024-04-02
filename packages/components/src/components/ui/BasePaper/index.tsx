import { Paper, PaperProps } from '@mui/material';

export type BasePaperProps = PaperProps;

const BasePaper = ({ children, ...rest }: BasePaperProps) => (
  <Paper
    variant="elevation"
    elevation={0}
    square
    sx={{
      flex: '1 1 auto',
      minHeight: 1,
    }}
    {...rest}
  >
    {children}
  </Paper>
);

export default BasePaper;
