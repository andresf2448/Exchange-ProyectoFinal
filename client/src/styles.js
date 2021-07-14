import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    elevation: '3',
    height: '10rem'
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  button: {
    width: '200px'
  },
  badge: {
    marginRight: '10px',
    color: theme.palette.primary.contrastText
  },
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.secondary.main
  },
  cryptoCurrency: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.primary.contrastText
  },
  offerTableHead: {
    backgroundColor: theme.palette.primary.light
  },
  tooltip: {
    borderRadius: "5px",
    background: "#26313c",
    color: "#fff",
    padding: "1px",
    boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
    textAlign: "center"
  }
}));

export default useStyles;