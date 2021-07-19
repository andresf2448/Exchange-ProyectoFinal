import { useEffect, useState} from 'react';
import axios from 'axios';
import { Container, Typography} from '@material-ui/core';
import useStyles from 'styles';


const Toml = () => {
    const classes = useStyles();

    const [toml, setToml] = useState();

    useEffect( () => {
        axios.get('http://localhost:3001/stellar.toml')
            .then((res) => {
                setToml(res.data);
            });
        }, [])
    return (
        <Container className={classes.toml}>
            {toml === undefined ?
                <Typography variant="h3"> Loading...</Typography>
                :
                    <Container>
                        <Typography align="left" variant="body1">Version = {toml.VERSION}</Typography>
                        <Typography align="left" variant="body1">Accounts = {toml.ACCOUNTS[0]}</Typography>
                        <Typography align="left" variant="body1">ORG_NAME = {toml.DOCUMENTATION.ORG_NAME}</Typography>
                        <Typography align="left" variant="body1">ORG_DBA = {toml.DOCUMENTATION.ORG_DBA}</Typography>
                        <Typography align="left" variant="body1">ORG_URL = {toml.DOCUMENTATION.ORG_URL}</Typography>
                        <Typography align="left" variant="body1">ORG_LOGO = {toml.DOCUMENTATION.ORG_LOGO}</Typography>
                        <Typography align="left" variant="body1">ORG_DESCRIPTION = {toml.DOCUMENTATION.ORG_DESCRIPTION}</Typography>
                        <Typography align="left" variant="body1">ORG_PHYSICAL_ADDRESS = {toml.DOCUMENTATION.ORG_PHYSICAL_ADDRESS}</Typography>
                        <Typography align="left" variant="body1">ORG_OFFICIAL_EMAIL = {toml.DOCUMENTATION.ORG_OFFICIAL_EMAIL}</Typography>
                    </Container>
            }
        </Container>
    )
}

export default Toml;