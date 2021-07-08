import {AppBar, Tabs, Tab} from '@material-ui/core';
import { useHistory } from "react-router";
import {supabase} from 'supabase/supabase';


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
                <Tab label="Logo" onClick={()=>history.push('/home/home')}/>
                <Tab label="About" />
                <Tab label="Other Exchanges" />
                <Tab label="Wallet" />
                <Tab label="Balance" />
                <Tab label="Settings" onClick={()=>history.push('/home/settings')}/>
                <Tab label="Logout" onClick={singOut} />
            </Tabs>
        </AppBar>
    )
}