import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import { Grid, Typography, Button, Box } from "@mui/material";

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const delayFetch = () => {
      axios
        .get(apiEndpoint)
        .then((res) => {
          setAlbums(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    setTimeout(delayFetch, 0);
  }, [apiEndpoint]);

  const displayedAlbums = showAll ? albums : albums.slice(0, 7);

  return (
    <Box sx={{ backgroundColor: "#121212", color: "white", padding: "20px" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Button
          onClick={() => setShowAll((prev) => !prev)}
          data-testid={`${title.toLowerCase().replace(/\s/g, "-")}-toggle`}
          sx={{
            color: "#34C94B",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          {showAll ? "Collapse" : "Show All"}
        </Button>
      </Box>

      {/* Album Grid */}
      <Grid container spacing={5}>
        {displayedAlbums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={3} lg={2}>
            <AlbumCard
              image={album.image}
              title={album.title}
              follows={album.follows}
              data-testid={`album-card-${album.title}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
