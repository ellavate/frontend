import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Login from "./Login";

const useStyles = makeStyles(theme => ({
  info: {
    margin: "50px 0"
  },
  btn: {
    border: "1px solid white",
    borderRadius: "5px",
    color: "black",
    backgroundColor: "white",
    width: "20%"
  }
}));

export default function Landing(props) {
  const classes = useStyles();
  const [modalState, setModalState] = React.useState({
    open: false,
    type: ""
  });

  const toggleModal = (open, type = "") => {
    console.log("called it");
    setModalState({
      open: open,
      type: type
    });
  };

  return (
    <div className="landing">
      {modalState.open ? (
        <Login
          type={modalState.type}
          toggleModal={toggleModal}
          history={props.history}
        />
      ) : null}
      <img
        src="https://images.pexels.com/photos/21264/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      <Typography variant="h6" className={`${classes.info} info-box`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
        vestibulum odio, eu ornare nibh. Morbi posuere tortor eget efficitur
        sodales. Aliquam leo nibh, imperdiet vel tincidunt condimentum,
        ultricies vitae ipsum. Maecenas convallis lectus diam, et dignissim
        purus interdum at. Nam fermentum lacus sed ligula luctus, in scelerisque
        arcu elementum. Sed sagittis sem ac neque fringilla suscipit. In vel dui
        non est laoreet luctus ac a elit. In vel molestie nulla. Aliquam finibus
        vel purus in blandit. Nulla nec feugiat elit, non commodo magna. Morbi
        porta mollis odio, sit amet faucibus ligula. Maecenas euismod tellus
        felis, quis imperdiet nunc auctor eu. Nunc vulputate ligula at ex
        tempor, vitae maximus nunc blandit. Phasellus viverra odio in est
        faucibus, eu ullamcorper ligula placerat. Curabitur varius ullamcorper
        nisl sed egestas. Ut tempus vulputate metus, et aliquam lectus tincidunt
        a.
      </Typography>
      <Button
        className={`${classes.btn} btn`}
        onClick={() => toggleModal(true, "signup")}
      >
        Sign Up
      </Button>
    </div>
  );
}
