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
  cardContainer: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px', 
    margin: 30, 
    padding: 15,                   
    display:"flex",
    justifyContent: "center", 
    alignItems: "center" 
  },
  loginContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  loginCard:{
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px',
    minWidth: "600px"
  },
  loginForm :{                
    display:"flex",
    justifyContent: "center", 
    alignItems: "center" 
  },
  loginGridItem: {
    display:"flex",
    justifyContent: "center", 
    alignItems: "center",
    margin: "5px"
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
  cryptoCurrency: {
    width: '96%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fdfbfb',
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
    display: "flex",
    alignItems: "center",
  },
  landingRegister: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  landingCard: {
    margin: '3%',
    height: 145,
    width: 200,
    padding: 20,
    textAlign: 'center',
    letterSpacing: 3,
  },
  landingCards: {
    margin: '3%',
    height: 145,
    width: 200,
    padding: 20,
    textAlign: 'center',
    letterSpacing: 3,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: 'all .2s linear',
    
    '&:hover': {
      background: "#ffd523",
      color: '#000',
  }},
  presentationBox: {
    margin: "3%",
  },
  cardCheck:{
    margin: '3%',
    padding: '2%',
    backgroundColor: '#272727b3',
    color: '#fdfbfb'
  },
  divider:{
    background: '#ffd523'
  },
  yellowButton: {
    width: '18%', 
    color: '#ffd523',
    borderRadius: '3px',
    transition: 'all .2s linear',
    '&:hover': {
      background: "#ffd52324",
    }  
  },
  balanceAccount: {
    letterSpacing: '3px',
    margin: '3%',
    display: 'flex',   
    alignContent: 'center',
    flexDirection: 'column',
    fontSize: 'larger'
  },
  appLogo: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner:{
    color: '#ffd523'
  }

}));

export default useStyles;