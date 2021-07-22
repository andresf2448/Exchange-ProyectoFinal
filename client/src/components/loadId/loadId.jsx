import React, { useState, useEffect } from "react";
import { supabase } from "supabase/supabase";
import {
  Grid,
  Container,
  Typography,
  TextField,
  FormControl,
  Button,
  ButtonGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { validate } from "./validate";

export const LoadId = () => {
  const session = supabase.auth.session();
  const { user } = session;
  let id_user = user.id;

  const [error, setError] = useState({
    isError: true,
    idType: "",
    nationality: "",
    idIssueDate: "",
    idExpirationDate: "",
    idNumber: "",
    birthDate: "",
  });

  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    idType: "",
    nationality: "",
    idIssueDate: "",
    idExpirationDate: "",
    idNumber: "",
    birthDate: "",
  });

  
  function handleOnChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value,
      })
    );
  }

  async function updateProfile(event) {
    event.preventDefault();
    console.log('data', data)
    const {
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
    } = data;
    
    let info = await supabase.from("IdentityDocument").insert([
      {
        id_user,
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
      },
    ]);
    console.log('info', info)
    await supabase
      .from("RegisteredUsers")
      .update({ hasProfileDniDocument: "true" })
      .match({ id_user });
    
    setHasProfile(true);
    
    setData({
        idType:"",
        nationality:"",
        idIssueDate:"",
        idExpirationDate:"",
        idNumber:"",
        birthDate:"",
    });
  }
  
  
  //1ro Llama a supa, verifica hasProfileDniDocument y si es true, setea en true el estado de abajo 
  //escucha en el useEffect de abajo
  const [hasProfile, setHasProfile] = useState(null);

  async function hasProfileFunction() {
    let hasProf  = await supabase
    .from('RegisteredUsers')
    .select('hasProfileDniDocument')
    .eq("id_user", session.user.id);
    if(hasProf.data[0].hasProfileDniDocument === true) setHasProfile(true);
  }
  
  //2do para editar el perfil, hay que agregar este estado para diferenciar si esta creando o editando.
  const [isEdit, setIsEdit] = useState(false);

  
  //3ro handleEdit permite mostrar de nuevo el form y cambiar el boton send por finish.
  async function handleEdit(){
    setHasProfile(false);
    setIsEdit(true);

    let {data: IdentityDocument, error }= await supabase
    .from("IdentityDocument")
    .select('*')
    .eq("id_user", id_user); //no me sale esto
     
    console.log('data', IdentityDocument)
    console.log('error', error)

    // setData({
    //   idType: idType,
    //   nationality: nationality,
    //   idIssueDate: idIssueDate,
    //   idExpirationDate:idExpirationDate,
    //   idNumber: idNumber,
    //   birthDate:birthDate,
    // });
  }

  //4to //envia los datos a supabase y cambia el estado de hasProfile
  async function editProfile(event) {
    event.preventDefault();
    const {
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
    } = data;
    
    await supabase.from("IdentityDocument").update([
      {
        id_user,
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
      },
    ]).match({ id_user });
    
    setHasProfile(true);

    setData({
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
    });
  }

  useEffect(() => {
    hasProfileFunction();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (error.isError) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [error]);

  useEffect(() => {
   console.log('data', data)
  }, [data]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Identification Document
      </Typography>
      {hasProfile ?
        <Container>
          <Typography variant="h4" gutterBottom>Your identification information is already uploaded</Typography>
          <Button onClick={() => handleEdit()}>Edit</Button>
        </Container>
        :
        <form onSubmit={updateProfile}>
          <Grid container>
            <Grid
              container
              item
              sm={6}
              direction="column"
              alignContent="space-around"
            >
                <FormControl>
                    <InputLabel>ID Type</InputLabel>
                    <Select
                    name='idType'
                    value={data.idType}
                    onChange={handleOnChange}
                    >
                        <MenuItem value={'DNI'}>DNI</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Nationality</InputLabel>
                    <Select
                    name='nationality'
                    value={data.nationality}
                    onChange={handleOnChange}
                    >
                        <MenuItem value={'Argentinian'}>Argentinian</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                name='idIssueDate'
                label={error.idIssueDate === "" ? 'ID Issue Date' : error.idIssueDate}
                error={data.idIssueDate !== "" && error.idIssueDate}
                type='date'
                value={data.idIssueDate}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true
                }}
                />
                <TextField
                name='idExpirationDate'
                label={error.idExpirationDate === "" ? 'ID Expiration Date' : error.idExpirationDate}
                error={ data.idExpirationDate !== "" && error.idExpirationDate}
                type='date'
                value={data.idExpirationDate}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true
                }}
                />
                <TextField
                label={error.idNumber === "" ? 'ID Number' : error.idNumber}
                error={data.idNumber !== "" && error.idNumber}
                name='idNumber'
                type='text'
                value={data.idNumber}
                onChange={handleOnChange}
                />
                <TextField
                label={error.birthDate === "" ? 'Birth date' : error.birthDate}
                error={data.birthDate !== "" && error.birthDate}
                name='birthDate'
                type='date'
                value={data.birthDate}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true
                }}
                />
            </Grid>

            <Grid
              container
              item
              sm={6}
              direction="column"
              alignContent="space-around"
            >
              {isEdit ?
                <ButtonGroup>
                  <Button
                  type="submit"
                  disabled={!submit}
                  variant="contained"
                  color="primary"
                  onClick={editProfile}
                  > 
                  {"Finish edit"}
                  </Button>
                  <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => setHasProfile(true)}
                  > 
                  {"Cancel"}
                  </Button>
                </ButtonGroup>
                
                :
                <Button
                  type="submit"
                  disabled={!submit}
                  variant="contained"
                  color="primary"
                  onClick={updateProfile}
                >
                  {"Send "}
                </Button>
              }
            </Grid>
          </Grid>
        </form>
      }
    </Container>
  );
};
