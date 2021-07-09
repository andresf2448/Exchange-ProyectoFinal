import {Box, makeStyles} from '@material-ui/core';
import {supabase} from 'supabase/supabase';

import {NavBar} from 'components/navBar/navBar'
import { useHistory } from "react-router";

import './home.scss';


export const useStyles = makeStyles(theme => ({
    
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        elevation: '3',
        height: '10rem' 
    },
    text:{
        color:theme.palette.primary.contrastText,
    },
}));


export const Home = () => {
    const history = useHistory();
      const session = supabase.auth.session();


    

    const classes = useStyles();

    

    return (
      <div>
        {session ? 
          <div>
            <NavBar />
            <Box className="user-data">
              <ul className={classes.text}>
                <li>USERNAME</li>
                <li>ACCOUNT</li>
                <li>BALANCE</li>
                <li>SOMETHING ELSE...</li>
              </ul>
            </Box>
        </div>
        : history.push('/')}
      </div> 
    );
}