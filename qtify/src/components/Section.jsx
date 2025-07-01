import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import Carousel from "./Carousel";
import { Grid, Typography, Button, Box } from "@mui/material";

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => {
      console.log("Loaded albums:", res.data);
      setAlbums(res.data);
    });
  }, [apiEndpoint]);

  const collapsedAlbums = albums;

  return (
    <Box sx={{ backgroundColor: "#121212", color: "white", padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Button
          onClick={() => setShowAll((prev) => !prev)}
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

      {showAll ? (
        <Grid container spacing={6.15}>
          {albums.map((album) => (
            <Grid item key={album.id} xs={12} sm={6} md={3} lg={2}>
              <AlbumCard
                image={album.image}
                title={album.title}
                follows={album.follows}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ position: "relative", overflow: "visible" }}>
          <Carousel
            items={collapsedAlbums}
            renderItem={(album) => (
              <AlbumCard
                image={album.image}
                title={album.title}
                follows={album.follows}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default Section;
