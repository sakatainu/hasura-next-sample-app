import { EditRounded as EditRoundedIcon } from '@mui/icons-material';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import Linker from '~/components/ui/Linker';
import { NewsItem } from '~/hooks/model/useNewsItems';

export type NewsTitleProps = {
  value: NewsItem;
  onClick?: (
    groupEventId: string,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

const NewsTitle = ({ value, onClick }: NewsTitleProps): JSX.Element => {
  if (value.category.code === 'groupEvent') {
    return (
      <MuiLink
        component="button"
        underline="hover"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
        onClick={(e) => onClick?.(value.id, e)}
      >
        <Typography variant="inherit" textAlign="left">
          {value.title}
        </Typography>
        <Box
          sx={{
            ml: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EditRoundedIcon fontSize="small" />
        </Box>
      </MuiLink>
    );
  }

  return (
    <Linker href={value.sourceRef} underline="hover" target="_blank">
      {value.title}
    </Linker>
  );
};

export default NewsTitle;
