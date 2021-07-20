
import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useStyles from 'styles';




export default function DropdownTab() {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles()


    function handleClick(event){
        return setAnchorEl(event.currentTarget);
    }
    function handleClose(){
        return setAnchorEl(null);
    }
    //'#B4A5A5' rgb(155,134,134) color:'rgb(124,116,116)'
    return(<div>
        <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.tabFont} style={{marginTop:'6px'}} onClick={handleClick}>Other</Button>
        <Menu 
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} 
        >
            <MenuItem onClick={handleClose}> <NavLink to='/faq' className={classes.navLink}> <h5>FAQ</h5></NavLink></MenuItem>
            <MenuItem onClick={handleClose}> <NavLink to='/about' className={classes.navLink}> <h5>About</h5></NavLink></MenuItem>

        </Menu>


    </div>)


}
  
