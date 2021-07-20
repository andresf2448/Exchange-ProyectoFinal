
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
  

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));


//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <div className={classes.root}>
      
//       <div>
//         <Button
//           ref={anchorRef}
//           aria-controls={open ? 'menu-list-grow' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//         >
//           Other
//         </Button>
//         <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
//                     <MenuItem onClick={handleClose}><NavLink to='/home'><h5>FAQ</h5></NavLink></MenuItem>
//                     <MenuItem onClick={handleClose}><NavLink to='/home'><h5>About</h5></NavLink> </MenuItem>
                    
                       
//                   </MenuList>

//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </div>
//     </div>
//   );
// }
