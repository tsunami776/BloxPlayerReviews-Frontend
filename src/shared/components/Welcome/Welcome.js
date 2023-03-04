import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import image from "../../../images/photo/blog_evergreen.png";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box bgcolor={"alternate.main"} padding={{ xs: 2, md: 4 }} borderRadius={2}>
      <Grid container spacing={4}>
        <Grid
          item
          container
          xs={12}
          md={6}
          alignItems={"center"}
          sx={{ position: "relative" }}
        >
          <Box data-aos={isMd ? "fade-right" : "fade-up"} marginBottom={4}>
            <Box marginBottom={2}>
              <Typography
                variant="h3"
                component={"h3"}
                sx={{
                  fontWeight: 700,
                }}
              >
                Discover Your Next Favorite Game in Roblox
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" component="p" color="text.secondary">
                - Rate, Review, and Share with Friends!
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "flex-start" }}
            >
              <NavLink to="/reviews" style={{ textDecoration: "none" }}>
                <Box
                  component={Button}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth={!isMd}
                >
                  Find a game review
                </Box>
              </NavLink>
            </Box>
          </Box>

        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={1} width={1} display={"flex"} justifyContent={"center"}>
            <Box
              height={1}
              width={1}
              maxWidth={{ xs: 600, md: "100%" }}
              maxHeight={500}
            >
              <Box
                component={"img"}
                src={image}
                width={1}
                height={1}
                sx={{
                  filter:
                    theme.palette.mode === "dark" ? "brightness(0.8)" : "none",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
