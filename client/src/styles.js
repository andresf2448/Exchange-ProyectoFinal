import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    elevation: '3',
    height: '10rem'
  },
  input: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.marfilWhite,
    margin: 1,
    borderRadius: 2
  },
  text: {
    color: "#fff",
  },
  textAbout: {
    color: '#ffd523',
    padding: 10
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBotton: "3%"
  },

  transactionCardContainer: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px',
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardUserContainer: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px',
    margin: '2%',
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardUserSpinner: {
    height: '60vh',
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px',
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: '2%'
  },
  loginContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center'
  },
  loginCard: {
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.contrastText,
    borderRadius: '6px',
    minWidth: "300px"
  },
  loginForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loginGridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px"
  },
  adminContainer: {
    backgroundColor: "#1F1F1F",
    // marginLeft: '1vw'
    // minHeight: "100vh"
  },
  adminCard: {
    backgroundColor: theme.palette.secondary.background,
    marginTop: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    paddingTop: '1%',
  },
  backCryptoCard: {
    backgroundColor: '#272727b3',
    marginTop: 15,
    marginLeft: 0,
    marginRight: 50,
    marginBottom: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  adminCardSearch: {
    display: "flex",
    // justifyContent: "center",
    flexDirection: 'row'
  },
  adminTableContainer: {
    maxHeight: "70vh"
  },
  trustLineTableContainer: {
    maxHeight: '40vh',
  },
  adminTable: {
    backgroundColor: theme.palette.primary.light
  },
  adminTableHeadCell: {
    backgroundColor: theme.palette.primary.dark
  },
  // loadingProfileContainer:{
  //   display: 'flex',
  //   justifyContent: "center",
  // },
  loadingProfileGridItem: {
    display: 'flex',
    justifyContent: 'center',
    // flexDirection: 'column',
    // alignContent: 'center'
  },
  cryptoCurrency: {
    width: '98%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  offerTableHead: {
    backgroundColor: theme.palette.primary.light
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.secondary.background,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '25%',
    left: '35%',
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
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundColor: "white"
  },
  navLink: {
    textDecoration: 'none'
  },
  tabFont: {
    color: theme.palette.primary.contrastText,
    opacity: '0.7'
  },
  landingContainers: {
    display: "flex",
    alignItems: "center",
  },
  landingRegister: {
    display: "flex",
    padding: 60,
    justifyContent: "space-around",
  },
  landingCard: {
    height: 145,
    padding: 0,
    textAlign: 'center',
    justifyContent: "center",
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
    }
  },
  inviteCard: {
    margin: '3%',
    height: '90%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
    letterSpacing: 3,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: 'all .2s linear',
    borderRadius: '4px',
  },
  invitedYellowButton: {
    width: '29%',
    height: '6vh',
    color: '#ffd523',
    borderRadius: '3px',
    transition: 'all .2s linear',
    '&:hover': {
      background: "#ffd52324",
    }
  },
  presentationBox: {
    margin: "3%",
  },
  cardCheck: {
    margin: '3%',
    padding: '2%',
    backgroundColor: '#272727b3',
    color: '#fdfbfb'
  },
  divider: {
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
  yellowButtonFlow: {
    width: '100%',
    color: '#ffd523',
    borderRadius: '3px',
    transition: 'all .2s linear',
    '&:hover': {
      background: "#ffd52324",
    }
  },

  depositYellowButton: {
    width: '60%',
    color: '#ffd523',
    borderRadius: '3px',
    transition: 'all .2s linear',
    '&:hover': {
      background: "#ffd52324",
    }
  },
  muxedYellowButton: {
    width: '100%',
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
  spinner: {
    color: '#ffd523'
  },
  twitterGrid: {
    margin: '1%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  twitterCard: {
    minHeight: '22vh',
    minWidth: '35vh',
    flexDirection: 'column',
    padding: '10px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '8px',
    color: '#afafaf',
    backgroundColor: '#15202B'
  },
  twitterLink: {
    marginTop: '5%',
    marginRight: '10%',
    backgroundColor: '#1679B6',
    color: '#04042b',
    fontSize: '12px',
    '&:hover': {
      background: "#1DA1F2",
      color: '#000'
    }
  },
  twitterUser: {
    fontStyle: 'italic'
  },
  twitterMetrics: {
    marginTop: '5%',
    marginLeft: '10%',
  },
  cardSaleOffer: {
    paddingTop: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingBottom: '5%'
  },
  appBar: {
    height: '87vh'
  },
  appBarResponsive: {
    width: "20vw",
    height: 'auto'
  },
  tabsNormal: {
    fontSize: '14px',
  },
  tabsResponsive: {
    paddingRight: '4vh',
    fontSize: '8px',
  },
  tabs1: {
    backgroundColor: 'rgb(255, 217, 112)',
    color: '#272727b3',

  },
  tabs1Responsive: {
    backgroundColor: 'rgb(255, 217, 112)',
    color: '#272727b3',
    fontSize: '10px',
    paddingRight: '4vh',
  },
  tabs2: {
    backgroundColor: 'rgb(10, 147, 168)',
  },
  tabs2Responsive: {
    backgroundColor: 'rgb(10, 147, 168)',
    fontSize: '10px',
    paddingRight: '4vh',
  },
  muxedAccountsList: {
    overflowY: 'scroll',
    height: 200
  }
}));

export default useStyles;