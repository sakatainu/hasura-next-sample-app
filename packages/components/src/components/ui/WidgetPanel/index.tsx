import {
  ArrowForwardIosSharp as ArrowForwardIosSharpIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  ButtonBase,
  Paper,
  PaperProps,
  Typography,
} from '@mui/material';
import { deepmerge } from '@mui/utils';
import React from 'react';
import { useToggle } from 'react-use';
import Link from '~/components/ui/Link';
import ProgressBox from '~/components/ui/ProgressBox';
import Row from '~/components/ui/Row';

export type WidgetPanelProps = Omit<PaperProps, 'title'> & {
  title?: React.ReactNode;
  titleActions?: React.ReactNode;
  fetching?: boolean;
  referenceLink?: {
    href: string;
    label: string;
  };
};

const WidgetPanel: React.FC<WidgetPanelProps> = ({
  title,
  titleActions,
  fetching,
  children,
  referenceLink,
  sx,
  ...props
}) => {
  const [expanded, setExpanded] = useToggle(true);

  return (
    <Accordion
      expanded={expanded}
      disableGutters
      elevation={0}
      sx={{
        border: 'none',
        backgroundColor: 'transparent',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <Row alignItems="center">
        <ButtonBase
          className={expanded ? 'Mui-expanded' : ''}
          disableRipple
          sx={{
            minHeight: 32,
            minWidth: 32,
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            '&.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
            color: 'text.secondary',
          }}
          onClick={setExpanded}
        >
          <ArrowForwardIosSharpIcon sx={{ fontSize: '1rem' }} />
        </ButtonBase>
        <Typography variant="body1" fontWeight="bold" component="div">
          {title}
        </Typography>
        <Box pl={2}>{titleActions}</Box>
        {referenceLink && (
          <Box ml="auto">
            <Button
              LinkComponent={Link}
              href={referenceLink.href}
              variant="text"
              size="small"
              endIcon={<NavigateNextRoundedIcon />}
            >
              {referenceLink.label}
            </Button>
          </Box>
        )}
      </Row>
      <AccordionDetails
        sx={{
          p: 0,
          pt: 1,
        }}
      >
        <Paper
          {...props}
          sx={deepmerge(
            {
              p: 2,
            },
            sx
          )}
          elevation={0}
        >
          {fetching ? <ProgressBox /> : <>{children}</>}
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};
export default WidgetPanel;
