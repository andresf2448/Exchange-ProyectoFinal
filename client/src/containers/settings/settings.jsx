import { Container, Tabs, Tab } from "@material-ui/core";
import {useState} from 'react';
import { LoadingProfile } from "components/loadingProfile/loadingProfile";
import RestorePassword from "components/restorePassword/restorePassword";


export function Settings() {
  const [value, setValue] = useState(0);

    const handleChange= (event, newValue)=>{
        event.preventDefault();
        setValue(newValue);
    }
  return (
    <Container maxWidth='md'>
            <Tabs value={value} onChange={handleChange} centered={true}>
                <Tab label="Profile"/>
                <Tab label="Change password"/>
            </Tabs>
            {value === 0 && <LoadingProfile />}
            {value === 1 && <RestorePassword />}
    </Container>
  );
}

