import { Breakpoint, Paper, Typography } from '@mui/material';
import React from 'react';
import Container from '~/components/ui/Container';

export type TemplateProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: false | Breakpoint;
};

const PageTitle = ({ title, children = null, maxWidth }: TemplateProps) => (
  <Paper
    square
    elevation={0}
    sx={{
      height: 48,
      borderBottom: 1,
      borderColor: 'divider',
    }}
  >
    <Container maxWidth={maxWidth}>
      <Typography py={1} variant="h6" component="h1" display="inline-block">
        {title}
      </Typography>
      {children}
    </Container>
  </Paper>
);
export default PageTitle;
