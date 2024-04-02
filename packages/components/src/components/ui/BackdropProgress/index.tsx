import { Backdrop, BackdropProps, CircularProgress } from '@mui/material';

const BackdropProgress = (param: BackdropProps) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    {...param}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default BackdropProgress;
