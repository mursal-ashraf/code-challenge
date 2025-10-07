import { Box, CircularProgress, Typography } from '@mui/material';

export const Loader: React.FC<{ text?: string }> = ({ text = '' }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
    >
      <CircularProgress />
      {!!text && <Typography variant="body1">{text}</Typography>}
    </Box>
  );
};
