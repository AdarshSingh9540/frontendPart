import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box
      sx={{
        width: { xs: 300, md: 600 },
        background: "#475569",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "auto", // Center horizontally
        padding: 2,
        borderRadius:"5px" // Add padding for spacing
      }}
    >
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation={false} />
    </Box>
  );
}
