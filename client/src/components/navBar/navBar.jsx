import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {supabase} from 'supabase/supabase';
import HomeIcon from '@material-ui/icons/Home';
import { HomeGrid } from 'containers/homeGrid/homeGrid';
import { About } from 'components/about/about';
import { Exchanges } from 'components/exchanges/exchanges';
import WalletContainer from 'containers/walletContainer/walletContainer';
import { Balance } from 'components/balance/balance';
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
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} centered={true}>
                    <Tab label={<HomeIcon/>} />
                    <Tab label="About" />
                    <Tab label="Other Exchanges" />
                    <Tab label="Wallet" />
                    <Tab label="Trade"/>
                    <Tab label="Settings" />
                    <Tab label="FAQ" />
                    <Tab label="Logout" onClick={signOut}/>
                    {admin && <Tab label="Admin" />}
                </Tabs>
            </AppBar>

           {value!== 7 && <ShowUserData/>}
           {value === 0 && <HomeGrid/>}
           {value === 1 && <About/>}
           {value === 2 && <Exchanges/>}
           {value === 3 && <WalletContainer/>}
           {value === 4 && <Trade/>}
           {value === 5 && <Settings/>}  
           {value === 6 && <Faq/>}   
           {value === 8 && <AdministratorUser />}

        </>
    )
}
  

