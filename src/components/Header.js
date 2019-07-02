import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
// import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Lock from "auth0-lock";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    borderBottom: "1px solid white"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    backgroundColor: "black",
    padding: "5px 0"
  },
  list: {
    width: 250
  }
}));

let lock = new Auth0Lock(
  process.env.REACT_APP_AUTH_CLIENT_ID,
  process.env.REACT_APP_AUTH_DOMAIN,
  {
    auth: {
      redirectUrl: "http://localhost:3000/home",
      responseType: "code",
      params: {
        scope: "openid email" // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  }
);

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Link to="/home">Home</Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.title} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            Ellavate Art
          </Typography>
          <Button color="inherit" onClick={lock.show}>
            Login
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Divider variant="middle" />
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
};
