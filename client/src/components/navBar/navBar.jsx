import { AppBar, Avatar, Tabs, Tab } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase/supabase";
import { HomeGrid } from "containers/homeGrid/homeGrid";
import WalletContainer from "containers/walletContainer/walletContainer";
import { Settings } from "containers/settings/settings";
import { ShowUserData } from "components/showUserData/showUserData";
import { AdministratorUser } from "components/administratorUser/admistratorUser";
import Trade from "containers/trade/trade";
import { InviteUser } from "components/invite/invite";
import FaqAbout from "containers/faqAbout/faqAbout";
import logoRXC from "./rocketXchange-white.png";

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
  return (
    <>
      <AppBar position="static">
        <Tabs value={value} variant="scrollable" onChange={handleChange}>
          <Tab
            icon={
              <Avatar
                alt="test avatar"
                src={logoRXC}
                style={{ widht: "100" }}
              />
            }
          />
          <Tab label="Wallet" />
          <Tab label="Trade" />
          <Tab label="Settings" />
          <Tab label="Others" />
          <Tab label="Invite" />
          {admin && <Tab label="Admin" />}
          <Tab label="Logout" onClick={signOut} />
        </Tabs>
      </AppBar>

      {session ? <ShowUserData /> : null}
      {value === 0 && <HomeGrid />}
      {value === 1 && <WalletContainer />}
      {value === 2 && <Trade />}
      {value === 3 && <Settings />}
      {value === 4 && <FaqAbout />}
      {value === 5 && <InviteUser />}
      {admin && value === 6 && <AdministratorUser />}
    </>
  );
};
