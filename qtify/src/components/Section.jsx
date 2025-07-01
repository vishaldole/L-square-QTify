import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import Carousel from "./Carousel";
import { Grid, Typography, Button, Box, Tabs, Tab } from "@mui/material";

const Section = ({ title, apiEndpoint, type = "albums" }) => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => {
      setAlbums(res.data);
    });

    if (type === "songs") {
      axios
        .get("https://qtify-backend-labs.crio.do/genres")
        .then((res) =>
          setGenres([{ key: "all", label: "All" }, ...res.data.data])
        );
    }
  }, [apiEndpoint, type]);

  const filteredAlbums =
    type === "songs" && selectedGenre !== "All"
      ? albums.filter((song) => song.genre.label === selectedGenre)
      : albums;

  const collapsedAlbums = filteredAlbums;

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

        {/* Hide Show All button for songs */}
        {type !== "songs" && (
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
        )}
      </Box>

      {/* Genre Tabs for Songs */}
      {type === "songs" && (
        <Tabs
          value={selectedGenre}
          onChange={(e, newVal) => setSelectedGenre(newVal)}
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              marginRight: 2,
              minWidth: 80,
            },
            "& .Mui-selected": {
              color: "#FFFFFF",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#34C94B",
            },
          }}
        >
          {genres.map((genre) => (
            <Tab key={genre.key} value={genre.label} label={genre.label} />
          ))}
        </Tabs>
      )}

      {/* Grid for albums when "Show All" is true */}
      {showAll && type !== "songs" ? (
        <Grid container spacing={2.5}>
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
                follows={type === "songs" ? album.likes : album.follows}
                isSong={type === "songs"}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default Section;
