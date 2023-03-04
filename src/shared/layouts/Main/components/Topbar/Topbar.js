import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../../../images/logo/Transparent Logo.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../context/auth-context";
import { NavItem } from "./components";

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  const auth = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    landings: landingPages,
    share: sharePages,
    account: accountPages,
  } = pages;
  const logoutHandler = () => {
    logout(true);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Box
        display={"flex"}
        component="a"
        href="/"
        title="theFront"
        width={{ xs: 100, md: 250 }}
      >
        <Box
          component={"img"}
          src={mode === "light" && !colorInvert ? logo : logo}
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
        <Box>
          <NavItem
            title={"Welcome"}
            id={"landing-pages"}
            items={landingPages}
            colorInvert={colorInvert}
          />
        </Box>
        <Box marginLeft={4}>
          <NavItem
            title={"Reviews"}
            id={"new-share"}
            items={sharePages}
            colorInvert={colorInvert}
          />
        </Box>
        {auth.isLoggedIn && (
          <Box marginLeft={4}>
            <NavItem
              title={"Account"}
              id={"account-pages"}
              items={accountPages}
              colorInvert={colorInvert}
            />
          </Box>
        )}

        <Box marginLeft={4}>
          <NavLink to="/auth" style={{ textDecoration: "none" }}>
            {auth.isLoggedIn ? (
              <Button
                variant="contained"
                color="primary"
                component="a"
                target="blank"
                size="large"
                onClick={logoutHandler}
              >
                Log out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component="a"
                target="blank"
                size="large"
              >
                Sign In
              </Button>
            )}
          </NavLink>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }} alignItems={"center"}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={"outlined"}
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
