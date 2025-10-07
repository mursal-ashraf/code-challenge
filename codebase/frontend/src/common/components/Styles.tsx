import React from 'react';
import { Box, Stack, Typography, type StackProps } from '@mui/material';

interface PropsWithChildren extends React.PropsWithChildren {}

export const CenterHorizontally: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {children}
    </Box>
  );
};

export const H1: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography gutterBottom component="h1" variant="h3">
      {children}
    </Typography>
  );
};

export const Row: React.FC<Omit<StackProps, 'direction'>> = ({
  children,
  ...rest
}) => {
  return (
    <Stack direction="row" {...rest}>
      {children}
    </Stack>
  );
};

export const Column: React.FC<Omit<StackProps, 'direction'>> = ({
  children,
  ...rest
}) => {
  return (
    <Stack direction="column" {...rest}>
      {children}
    </Stack>
  );
};
