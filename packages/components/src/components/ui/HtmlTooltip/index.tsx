import styled from '@emotion/styled';
import { TooltipProps, Tooltip, tooltipClasses } from '@mui/material';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: 'initial',
    maxWidth: 'none',
  },
}));

export default HtmlTooltip;
