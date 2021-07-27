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
  Checkbox,
  Tooltip
} from "@material-ui/core";
import { validate } from "./validate";
import useStyles from 'styles';

export const LoadingProfile = () => {
  const classes = useStyles();
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
    codeVerification:"",
    hasTwoFA: false
  });

  let {
    firstName,
    lastName,
    additionalName,
    mobileNumber,
    occupation,
    gender,
    codeVerification,
    hasTwoFA
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
        hasTwoFA
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
        hasTwoFA
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
        gender, 
        hasTwoFA} = supaData.data[0];

      setData({
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,
        hasTwoFA
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
  const handleTwoStepSelect=(e)=>{
    setData({...data, hasTwoFA: e.target.checked})
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
    <Container >
      <Grid container > 
        <Grid item xs={12} className={classes.loadingProfileGridItem}>
          <Typography variant="h4" gutterBottom>
            Update Information
          </Typography>
        </Grid>
        {hasProfile ? (
          <Grid item xs={12} >
              <Typography variant='h6' gutterBottom align="center">First name: {firstName}</Typography>
              <Typography variant='h6' gutterBottom align="center">Last name: {lastName}</Typography>
              <Typography variant='h6' gutterBottom align="center">Additional name: {additionalName}</Typography>
              <Typography variant='h6' gutterBottom align="center">Mobile Number: {mobileNumber}</Typography>
              <Typography variant='h6' gutterBottom align="center">Occupation: {occupation}</Typography>
              <Typography variant='h6' gutterBottom align="center">Gender: {gender}</Typography>
              <Typography variant='h6' gutterBottom align="center">Two Step Verification: {hasTwoFA? 'Yes': 'No'}</Typography>
            <Button onClick={() => handleEdit()} color="primary" variant="contained" className={classes.loadingProfileGridItem}>Edit</Button>
          </Grid>
        ) : (
          <form onSubmit={updateProfile}>
            <Grid container>
              <Grid
                item
                sm={6}
                xs={6}
                direction="column"
                className={classes.loadingProfileGridItem}
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
                <Tooltip title="Before verifying you should first send 'join stairs-cross' to the whatsapp number +14155238886">
                  <TextField
                    label="Mobile Number"
                    helperText='i.e. 54911********'
                    name="mobileNumber"
                    type="text"
                    value={data.mobileNumber}
                    onChange={handleOnChange}
                    /> 
                </Tooltip>
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
                item
                sm={6}
                xs={6}
                direction="column"
                className={classes.loadingProfileGridItem}
                >
                <FormControl>
                  <FormControlLabel
                    control={<Checkbox checked={hasTwoFA} onChange={handleTwoStepSelect} />}
                    label="Check this box to activate Two Step validation"
                    />
                </FormControl>
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
                      color="secondary"
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
                  color="secondary"
                  onClick={updateProfile}
                  >
                    {"Send "}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </Container>
  );
};
