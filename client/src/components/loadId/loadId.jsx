import React, { useState, useEffect } from "react";
import { supabase } from "supabase/supabase";
import axios from "axios";
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
import useStyles from 'styles';

export const LoadId = () => {
  const classes = useStyles();
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

  const [file, setFile] = useState();
  const [contador, setContador] = useState(1);

  let {
    idType,
    nationality,
    idIssueDate,
    idExpirationDate,
    idNumber,
    birthDate,
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

    const data = new FormData();
    data.append("file", file);
    data.append("identificacion", idNumber);

    const response = await axios.post("http://localhost:3001/upload", data);
 
    if (response.data === true) {
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

      alert("your data has been successfully verified");
      setHasProfile(true);
    }else if(contador < 2){
      alert("Your identification has not been successfully validated, please enter a new image with the highest possible resolution and verify that the number entered is correct.");
      setContador(contador + 1);
    }else{
      alert("The validation algorithm did not recognize your identity, please contact rocketexchange1@gmail.com for validation with an administrator.")
    }
  }

  async function updateProfileEdit(event) {
    event.preventDefault();
    await supabase
      .from("IdentityDocument")
      .update([
        {
          idType,
          nationality,
          idIssueDate,
          idExpirationDate,
          idNumber,
          birthDate,
        },
      ])
      .match({ id_user });
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
    let hasProf = await supabase
      .from("RegisteredUsers")
      .select("hasProfileDniDocument")
      .eq("id_user", session.user.id);
    if (hasProf.data[0].hasProfileDniDocument === true) {
      setHasProfile(true);

      let supaData = await supabase
        .from("IdentityDocument")
        .select("*")
        .match({ id_user });

      let {
        idType,
        nationality,
        idIssueDate,
        idExpirationDate,
        idNumber,
        birthDate,
      } = supaData.data[0];

      setData({
        idType: idType,
        nationality: nationality,
        idIssueDate: idIssueDate,
        idExpirationDate: idExpirationDate,
        idNumber: idNumber,
        birthDate: birthDate,
      });
    }
  }

  //2do para editar el perfil, hay que agregar este estado para diferenciar si esta creando o editando.
  const [isEdit, setIsEdit] = useState(false);

  //3ro handleEdit permite mostrar de nuevo el form y cambiar el boton send por finish.
  async function handleEdit() {
    setHasProfile(false);
    setIsEdit(true);
  }

  //4to //envia los datos a supabase y cambia el estado de hasProfile

  const finishEdit = (event) => {
    updateProfileEdit(event);
    setHasProfile(true);
  };

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
      <Grid container>
        <Grid item sm={12} >
        <Typography variant="h4" gutterBottom align="center">
          Update Identification Document
        </Typography>
        </Grid>
      {hasProfile ? (
        <Grid item xs={12} className={classes.loadingProfileGridItem}>
          <FormControl>
            <Typography variant="h6">ID type: {idType}</Typography>
            <Typography variant="h6">ID number: {idNumber}</Typography>
            <Typography variant="h6">Birth date: {birthDate}</Typography>
            <Typography variant="h6">Nationality: {nationality}</Typography>
            <Typography variant="h6">Issue date: {idIssueDate}</Typography>
            <Typography variant="h6">Expiration date: {idExpirationDate}</Typography>
            <Button onClick={() => handleEdit()} variant="contained" color="secondary">Edit</Button>
          </FormControl>
        </Grid>
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
              <FormControl style={{paddingBottom: 10}}>
                <InputLabel>ID Type</InputLabel>
                <Select
                  name="idType"
                  value={data.idType}
                  onChange={handleOnChange}
                >
                  <MenuItem value={"DNI"}>DNI</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{paddingBottom: 10}}>
                <InputLabel>Nationality</InputLabel>
                <Select
                  name="nationality"
                  value={data.nationality}
                  onChange={handleOnChange}
                >
                  <MenuItem value={"Argentinian"}>Argentinian</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="idIssueDate"
                label={
                  error.idIssueDate === "" ? "ID Issue Date" : error.idIssueDate
                }
                error={data.idIssueDate !== "" && error.idIssueDate}
                type="date"
                value={data.idIssueDate}
                onChange={handleOnChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{paddingBottom: 10}}
              />
              <TextField
                name="idExpirationDate"
                label={
                  error.idExpirationDate === ""
                    ? "ID Expiration Date"
                    : error.idExpirationDate
                }
                error={data.idExpirationDate !== "" && error.idExpirationDate}
                type="date"
                value={data.idExpirationDate}
                onChange={handleOnChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{paddingBottom: 10}}
              />
              <TextField
                label={error.idNumber === "" ? "ID Number" : error.idNumber}
                error={data.idNumber !== "" && error.idNumber}
                name="idNumber"
                type="text"
                value={data.idNumber}
                onChange={handleOnChange}
                style={{paddingBottom: 10}}
              />
              <TextField
                label={error.birthDate === "" ? "Birth date" : error.birthDate}
                error={data.birthDate !== "" && error.birthDate}
                name="birthDate"
                type="date"
                value={data.birthDate}
                onChange={handleOnChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{paddingBottom: 10}}
              />
            </Grid>

            <Grid
              container
              item
              sm={6}
              direction="column"
              alignContent="space-around"
            >
              <label style={{paddingBottom: 10}}>Please enter a scanned image in black and white .jpeg or .png format with the highest possible resolution. Verify that the background where the number is located is as white as possible and that in the total image only the content of the card is visible.</label>
              <TextField
                name="file"
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{paddingBottom: 20}}
              />
              {isEdit ? (
                <ButtonGroup>
                  <Button
                    type="submit"
                    disabled={!submit}
                    variant="contained"
                    color="secondary"
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
      </Grid>
    </Container>
  );
};