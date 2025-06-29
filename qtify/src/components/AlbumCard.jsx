// components/AlbumCard.jsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const AlbumCard = ({ image, title, follows }) => {
  return (
    <Box
      sx={{
        width: 159,
        height: 232,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
      }}
    >
      <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: 160,
            height: 160,
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />

        {/* Follows */}
        <Chip
          label={`${follows} Follows`}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "12px",
            height: "24px",
            borderRadius: "12px",
            ml: 1,
            mb: 1,
            mt: 1,
            fontWeight: 500,
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "#fff", fontWeight: 600, textAlign: "center" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default AlbumCard;
