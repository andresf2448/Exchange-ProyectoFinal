import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {supabase} from 'supabase/supabase';
import HomeIcon from '@material-ui/icons/Home';
import { HomeGrid } from 'containers/homeGrid/homeGrid';
import WalletContainer from 'containers/walletContainer/walletContainer';
import { Settings } from 'containers/settings/settings';
import { ShowUserData } from 'components/showUserData/showUserData';
import  Faq  from 'components/faq/faq';
import { AdministratorUser } from "components/administratorUser/admistratorUser";
import Trade from "containers/trade/trade";

export const NavBar = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [admin, setAdmin] = useState(false);
  const session = supabase.auth.session();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  async function getRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select("isAdmin ,bannedUser")
      .eq("id_user", session.user.id);

    if (data.length !== 0) {
      if (data[0].isAdmin) {
        setAdmin(true);
      }
    }
  }
  useEffect(() => {
    getRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const signOut = async () => {
        await supabase.auth.signOut();
        history.push("/");
    };
    return(
        <>
            <AppBar position="static" >
                <Tabs value={value} variant='scrollable' onChange={handleChange} centered={true}>
                    <Tab label={<HomeIcon/>} />
                    <Tab label="Wallet" />
                    <Tab label="Trade"/>
                    <Tab label="Settings" />
                    <Tab label="FAQ" />
                    <Tab label="Logout" onClick={signOut}/>
                    {admin && <Tab label="Admin" />}
                </Tabs>
            </AppBar>

           {value!== 5 && <ShowUserData/>}
           {value === 0 && <HomeGrid/>}
           {value === 1 && <WalletContainer/>}
<<<<<<< HEAD
           {value === 2 && <Balance/>}
=======
           {value === 2 && <Trade/>}
>>>>>>> 3ec08548641caddac086f0b11a3c9045b0ff0711
           {value === 3 && <Settings/>}  
           {value === 4 && <Faq/>}   
           {value === 6 && <AdministratorUser />}

        </>
    )
}
  

