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
            <Button
              type="submit"
              disabled={!submit}
              variant="contained"
              color="primary"
              onClick={updateProfile}
            >
              {"Send "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
