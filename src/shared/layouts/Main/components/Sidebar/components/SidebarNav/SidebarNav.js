import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import logo from "../../../../../../../images/logo/Transparent Logo.png";
import { AuthContext } from "../../../../../../context/auth-context";
import { NavLink } from "react-router-dom";

import NavItem from "./components/NavItem";

const SidebarNav = ({ pages, closeSideBar }) => {
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
    closeSideBar();
    logout(true);
  };

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={"flex"}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 200, md: 220 }}
        >
          <Box
            component={"img"}
            src={mode === "light" ? logo : logo}
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem
            title={"Welcome"}
            items={landingPages}
            closeSideBar={closeSideBar}
          />
        </Box>
        <Box>
          <NavItem
            title={"Reviews"}
            items={sharePages}
            closeSideBar={closeSideBar}
          />
        </Box>
        {auth.isLoggedIn && (
          <Box>
            <NavItem
              title={"Account"}
              items={accountPages}
              closeSideBar={closeSideBar}
            />
          </Box>
        )}

        <Box>
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
                onClick={closeSideBar}
              >
                Sign In
              </Button>
            )}
          </NavLink>
        </Box>

        {/*<Box marginTop={2}>*/}
        {/*  <Button*/}
        {/*    size={'large'}*/}
        {/*    variant="outlined"*/}
        {/*    fullWidth*/}
        {/*    component="a"*/}
        {/*    href="/docs/introduction"*/}
        {/*  >*/}
        {/*    Documentation*/}
        {/*  </Button>*/}
        {/*</Box>*/}
        {/*<Box marginTop={1}>*/}
        {/*  <Button*/}
        {/*    size={'large'}*/}
        {/*    variant="contained"*/}
        {/*    color="primary"*/}
        {/*    fullWidth*/}
        {/*    component="a"*/}
        {/*    target="blank"*/}
        {/*    href="https://mui.com/store/items/the-front-landing-page/"*/}
        {/*  >*/}
        {/*    Purchase now*/}
        {/*  </Button>*/}
        {/*</Box>*/}
      </Box>
    </Box>
  );
};

export default SidebarNav;
