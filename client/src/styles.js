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
    display: ' flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: '10px',
    marginRight: '10px',
    color: theme.palette.primary.contrastText
  },
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.secondary.main
  },

  cardCheck: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px', 
    margin: 30, 
    padding: 15,                   
    display:"flex",
    justifyContent: "center", 
    alignItems: "center" 
  },
  formCheck :{                
    display:"flex",
    justifyContent: "center", 
    alignItems: "center" 
  },

  cryptoCurrency: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.contrastText,
    justifyContent: 'center',
  },
  offerTableHead: {
    backgroundColor: theme.palette.primary.light
  },
  tooltip: {
    borderRadius: "5px",
    background: "#26313c",
    color: "#fff",
    paddingLeft: "2px",
    paddingRigth: "2px",
    boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
    textAlign: "center"
  },
  adminContainer: {
    backgroundColor: "#1F1F1F",
    minHeight:"100vh"
  },
  adminCard: {
    backgroundColor: theme.palette.secondary.background,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    padding: 10
  },
  adminCardSearch: {
    display: "flex",
    justifyContent: "center",
  },
  adminTableContainer: {
    maxHeight: "70vh"
  },
  adminTable:{
    backgroundColor: theme.palette.primary.light
  },
  adminTableHeadCell: {
    backgroundColor: theme.palette.primary.dark
  },
  cryptoChart: {
    display: 'flex',
    justifyContent: "center"
  },
  tableScroll: {
    maxHeight: 300
  },
  toml: {
    minHeight:"100vh", 
    minWidth:"100vw", 
    backgroundColor: "white"
  },
  navLink:{
    textDecoration:'none'
  },
  tabFont:{
    color:theme.palette.primary.contrastText,
    opacity:'0.7'
  },
  landingContainers: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  landingCard: {
    height: 150,
    width: 180,
    paddingTop: 20,
    textAlign: 'center'
  },
  appLogo: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default useStyles;