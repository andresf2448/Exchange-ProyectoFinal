import {AppBar, Tabs, Tab} from '@material-ui/core';
import { useHistory } from "react-router";
import {supabase} from 'supabase/supabase';
import HomeIcon from '@material-ui/icons/Home';

export const NavBar= () =>{
    const history = useHistory();

    const singOut = async () => {
        await supabase.auth.signOut();
        history.push("/");
    };
    return(
        <AppBar position="static">
            <Tabs>
                {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"> */}
                <Tab label={<HomeIcon/>} onClick={()=>history.push('/home/home')}/>
                <Tab label="About" onClick={()=>history.push('/home/about')}/>
                <Tab label="Other Exchanges" onClick={()=>history.push('/home/exchanges')}/>
                <Tab label="Wallet" onClick={()=>history.push('/home/wallet')}/>
                <Tab label="Balance" onClick={()=>history.push('/home/balance')}/>
                <Tab label="Settings" onClick={()=>history.push('/home/settings')}/>
                <Tab label="Logout" onClick={singOut} />
            </Tabs>
        </AppBar>
    )
}