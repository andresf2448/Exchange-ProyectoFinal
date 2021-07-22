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
  Box,
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
    const {
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
    } = data;
    
    await supabase.from("IdentityDocument").insert([
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

    await supabase
      .from("RegisteredUsers")
      .update({ hasProfileDniDocument: "true" })
      .match({ id_user });
    
    setHasProfile(true);
  }
  async function updateProfileEdit(event) {
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
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
      },
    ]).match({ id_user });
    ;

    await supabase
      .from("RegisteredUsers")
      .update({ hasProfileDniDocument: "true" })
      .match({ id_user });
    
    setHasProfile(true);
  }
  
  
  //1ro Llama a supa, verifica hasProfileDniDocument y si es true, setea en true el estado de abajo 
  //escucha en el useEffect de abajo
  const [hasProfile, setHasProfile] = useState(null);

  async function hasProfileFunction() {
    let hasProf  = await supabase
    .from('RegisteredUsers')
    .select('hasProfileDniDocument')
    .eq("id_user", session.user.id);
    if(hasProf.data[0].hasProfileDniDocument === true) {
      setHasProfile(true);

      let supaData= await supabase
      .from("IdentityDocument")
      .select('*')
      .match({ id_user });
       
      let {idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,} = supaData.data[0];

      setData({
          idType: idType,
          nationality: nationality,
          idIssueDate: idIssueDate,
          idExpirationDate:idExpirationDate,
          idNumber: idNumber,
          birthDate:birthDate,
        });

    }
  }
  
  //2do para editar el perfil, hay que agregar este estado para diferenciar si esta creando o editando.
  const [isEdit, setIsEdit] = useState(false);

  
  //3ro handleEdit permite mostrar de nuevo el form y cambiar el boton send por finish.
  async function handleEdit(){
    setHasProfile(false);
    setIsEdit(true);
  }

  //4to //envia los datos a supabase y cambia el estado de hasProfile
  
  const finishEdit= (event)=>{
    updateProfileEdit(event)
    setHasProfile(true)
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Identification Document
      </Typography>
      {hasProfile ?
        <Container>
          <Box>
            <Typography variant='h6'>ID type: {data.idType}</Typography>
            <Typography variant='h6'>ID number: {data.idNumber}</Typography>
            <Typography variant='h6'>Birth date: {data.birthDate}</Typography>
            <Typography variant='h6'>Nationality: {data.nationality}</Typography>
            <Typography variant='h6'>Issue date: {data.idIssueDate}</Typography>
            <Typography variant='h6'>Expiration date{data.idExpirationDate}</Typography>
          </Box>
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
                  onClick={finishEdit}
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
