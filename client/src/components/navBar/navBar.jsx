import {AppBar, Tabs, Tab} from '@material-ui/core';
import {useState} from 'react';
import { useHistory } from "react-router";
import {supabase} from 'supabase/supabase';
import HomeIcon from '@material-ui/icons/Home';
import { HomeGrid } from 'containers/homeGrid/homeGrid';
import { About } from 'components/about/about';
import { Exchanges } from 'components/exchanges/exchanges';
import { Wallet } from 'components/wallet/wallet';
import { Balance } from 'components/balance/balance';
import { Settings } from 'containers/settings/settings';
import { ShowUserData } from 'components/showUserData/showUserData';

export const NavBar= () =>{
    const history = useHistory();
    const [value, setValue] = useState(0);

    const handleChange= (event, newValue)=>{
        event.preventDefault();
        setValue(newValue);
    }

    const singOut = async () => {
        await supabase.auth.signOut();
        history.push("/");
    };
    return(
        <>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={<HomeIcon/>} />
                    <Tab label="About" />
                    <Tab label="Other Exchanges" />
                    <Tab label="Wallet" />
                    <Tab label="Balance"/>
                    <Tab label="Settings" />
                    <Tab label="Logout" onClick={singOut} />
                </Tabs>
            </AppBar>
            <ShowUserData/>
           {value === 0 && <HomeGrid/>}
           {value === 1 && <About/>}
           {value === 2 && <Exchanges/>}
           {value === 3 && <Wallet/>}
           {value === 4 && <Balance/>}
           {value === 5 && <Settings/>}     
        </>
    )
}