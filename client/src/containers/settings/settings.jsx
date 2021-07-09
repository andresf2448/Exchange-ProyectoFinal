import { Container, AppBar, Tabs, Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export function Settings() {
  const history = useHistory();
  return (
    <Container maxWidth='md'>
      <AppBar position="static" >
            <Tabs>
                <Tab label="Profile" onClick={()=> history.push('/home/settings/profile')} />
                <Tab label="Transactions History" onClick={()=> history.push('/home/settings/history')}/>
                <Tab label="Deposit" onClick={()=> history.push('/home/settings/deposit')}/>
                <Tab label="Withdraw"onClick={()=> history.push('/home/settings/withdraw')} />
            </Tabs>
        </AppBar>
    </Container>
  );
}
