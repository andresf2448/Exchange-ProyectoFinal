import React, { useState, useEffect } from "react";
import sendCode from './whatsapp';
import { supabase } from "supabase/supabase";
import {
  Grid,
  Container,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  ButtonGroup,
  Box,
} from "@material-ui/core";
import { validate } from "./validate";

export const LoadingProfile = () => {
  const session = supabase.auth.session();
  const { user } = session;
  let id_user = user.id;

  const [error, setError] = useState({
    isError: true,
    firstName: "",
    gender: "",
    lastName: "",
    codecodeVerification:""
  });

  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    additionalName: "",
    mobileNumber: "",
    occupation: "",
    gender: "",
    code:"",
    codeVerification:""
  });

  let {
    firstName,
    lastName,
    additionalName,
    mobileNumber,
    occupation,
    gender,
    codeVerification
  } = data;


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

    await supabase.from("UserAnchor").insert([
      {
        id_user,
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,
      },
    ]);

    await supabase
      .from("RegisteredUsers")
      .update({ hasProfileUserAnchor: "true" })
      .match({ id_user });

    setHasProfile(true);
  }

  async function updateProfileEdit(event) {
    event.preventDefault();

    await supabase.from("UserAnchor").update([
      {
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,
      },
    ]).match({ id_user });;

    await supabase
      .from("RegisteredUsers")
      .update({ hasProfileUserAnchor: "true" })
      .match({ id_user });

    setHasProfile(true);
  }



  //1ro Llama a supa, verifica hasProfileUserAnchor y si es true, setea en true el estado de abajo
  //escucha en el useEffect de abajo
  const [hasProfile, setHasProfile] = useState(null);

  async function hasProfileFunction() {
    let hasProf  = await supabase
    .from('RegisteredUsers')
    .select('hasProfileUserAnchor')
    .eq("id_user", session.user.id);
    if(hasProf.data[0].hasProfileUserAnchor === true){
      setHasProfile(true);

      let supaData= await supabase
        .from("UserAnchor")
        .select('*')
        .match({ id_user });
       
      let {firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,} = supaData.data[0];

      setData({
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,
        });
      }

    }
  

  //2do para editar el perfil, hay que agregar este estado para diferenciar si esta creando o editando.
  const [isEdit, setIsEdit] = useState(false);

  //3ro handleEdit permite mostrar de nuevo el form y cambiar el boton send por finish.
  function handleEdit() {
    setHasProfile(false);
    setIsEdit(true);
  }

  //4to //envia los datos a supabase y cambia el estado de hasProfile
  const finishEdit= (event)=>{
    updateProfileEdit(event)
    setHasProfile(true)
  }

  const handleVerifyClick=(e)=>{
    e.preventDefault()
    const random= Math.floor(Math.random()*1000000)
    setData({...data, code: random})
    try{
      sendCode(random, mobileNumber)
    }catch(err){
      console.log('error', err)
    }

  }

  useEffect(() => {
    hasProfileFunction();
    // eslint-disable-next-line
  }, []);

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
        Update Information
      </Typography>
      {hasProfile ? (
        <Container>
           <Box>
            <Typography variant='h6'>First name: {firstName}</Typography>
            <Typography variant='h6'>Last name: {lastName}</Typography>
            <Typography variant='h6'>Additional name: {additionalName}</Typography>
            <Typography variant='h6'>Mobile Number: {mobileNumber}</Typography>
            <Typography variant='h6'>Occupation: {occupation}</Typography>
            <Typography variant='h6'>Gender: {gender}</Typography>
          </Box>
          <Button onClick={() => handleEdit()} color="primary" variant="contained">Edit</Button>
        </Container>
      ) : (
        <form onSubmit={updateProfile}>
          <Grid container>
            <Grid
              container
              item
              sm={6}
              direction="column"
              alignContent="space-around"
            >
              <TextField
                label={error.firstName === "" ? "First Name" : error.firstName}
                required
                name="firstName"
                type="text"
                value={data.firstName}
                onChange={handleOnChange}
                color={error.firstName === "" ? "primary" : "secondary"}
              />

              <TextField
                label={error.lastName === "" ? "Last Name" : error.lastName}
                required
                name="lastName"
                type="text"
                value={data.lastName}
                onChange={handleOnChange}
                color={error.lastName === "" ? "primary" : "secondary"}
              />

              <TextField
                label="Additional Name"
                name="additionalName"
                type="text"
                value={data.additionalName}
                onChange={handleOnChange}
              />
              <TextField
                label="Mobile Number"
                helperText='i.e. 54911********'
                name="mobileNumber"
                type="text"
                value={data.mobileNumber}
                onChange={handleOnChange}
              /> 
              <Button onClick={handleVerifyClick} disabled={!mobileNumber}> Verify Number</Button>
              {data.code === ""? null: (
              <TextField
                label={error.codeVerification === "" ? "Check your whatsapp" : error.codeVerification}
                name="codeVerification"
                type="text"
                color={error.codeVerification === "" ? "primary" : "secondary"}
                value={codeVerification}
                onChange={handleOnChange}
              /> )}

              <TextField
                label="Occupation"
                name="occupation"
                type="text"
                value={data.occupation}
                onChange={handleOnChange}
              />
            </Grid>

            <Grid
              container
              item
              sm={6}
              direction="column"
              alignContent="space-around"
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {error.gender === "" ? "Gender" : error.gender}
                </FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={data.gender}>
                  <FormControlLabel
                    value="Male"
                    onClick={handleOnChange}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    onClick={handleOnChange}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    onClick={handleOnChange}
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              {isEdit ? (
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
              ) : (
                <Button
                  type="submit"
                  disabled={!submit}
                  variant="contained"
                  color="primary"
                  onClick={updateProfile}
                >
                  {"Send "}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};
