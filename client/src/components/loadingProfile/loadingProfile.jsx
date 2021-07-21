import React, { useState, useEffect } from "react";
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
  });

  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    additionalName: "",
    mobileNumber: "",
    occupation: "",
    gender: "",
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
      firstName,
      lastName,
      additionalName,
      mobileNumber,
      occupation,
      gender,
    } = data;
    
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
    
    setData({
      firstName: "",
      lastName: "",
      additionalName: "",
      mobileNumber: "",
      occupation: "",
      gender: "",
    });
  }
  
  
  //1ro Llama a supa, verifica hasProfileUserAnchor y si es true, setea en true el estado de abajo 
  //escucha en el useEffect de abajo
  const [hasProfile, setHasProfile] = useState(null);

  async function hasProfileFunction() {
    let hasProf  = await supabase
    .from('RegisteredUsers')
    .select('hasProfileUserAnchor')
    .eq("id_user", session.user.id);
    if(hasProf.data[0].hasProfileUserAnchor === true) setHasProfile(true);
    // console.log(hasP.data[0].hasProfileUserAnchor);
  }
  
  //2do para editar el perfil, hay que agregar este estado para diferenciar si esta creando o editando.
  const [isEdit, setIsEdit] = useState(false);

  
  //3ro handleEdit permite mostrar de nuevo el form y cambiar el boton send por finish.
  function handleEdit(){
    setHasProfile(false);
    setIsEdit(true);
  }

  //4to //envia los datos a supabase y cambia el estado de hasProfile
  async function editProfile(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      additionalName,
      mobileNumber,
      occupation,
      gender,
    } = data;
    
    await supabase.from("UserAnchor").update([
      {
        id_user,
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        occupation,
        gender,
      },
    ]).match({ id_user });
    
    setHasProfile(true);

    setData({
      firstName: "",
      lastName: "",
      additionalName: "",
      mobileNumber: "",
      occupation: "",
      gender: "",
    });
  }

  useEffect(() => {
    //aca escucha
    hasProfileFunction();
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
        Update Information
      </Typography>
      {hasProfile ?
        <Container>
          <Typography variant="h4" gutterBottom>Completaste tu perfil</Typography>
          <Button onClick={() => handleEdit()}>Editar</Button>
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
                name="mobileNumber"
                type="text"
                value={data.mobileNumber}
                onChange={handleOnChange}
              />

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
                <RadioGroup aria-label="gender" name="gender">
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
