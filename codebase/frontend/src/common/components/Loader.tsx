import { Box, CircularProgress, Typography } from '@mui/material';

export const Loader: React.FC<{ text?: string }> = ({ text = '' }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '45%',
        left: '45%',
        textAlign: 'center',
      }}
    >
      <CircularProgress />
      {!!text && <Typography variant="body1">{text}</Typography>}
    </Box>
  );
};
