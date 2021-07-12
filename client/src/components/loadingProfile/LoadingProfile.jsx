import React, { useState, useEffect } from "react";
import { supabase } from "supabase/supabase";
import { Container, Typography, TextField , FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from '@material-ui/core'
import useStyles from 'styles.js';
import { validate } from "./validate";

export const LoadingProfile = () => {
  const classes = useStyles();
  const [error, setError] = useState({
    isError: true,
    firstName: "",
    sex: "",
    lastName: ""
  })

  const [submit, setSubmit] = useState(false)

  const [data, setData] = useState({
    additionalName: "",
    firstName: "",
    languageCode: "",
    lastName: "",
    mobileNumber: "",
    notaryApprovalOfPhotoId: "",
    occupation: "",
    photoProofResidence: "",
    sex: "",
    taxtIdName: "",
    userName: "",
  });

  function handleOnChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value
      })
    )
  }

  const sexUser = (event) => {
    setData({
      ...data,
      //cambie e.target.id por e.target.value
      sex: event.target.value,
    });
  };

  async function updateProfile(event) {
    event.preventDefault();

    const {
      userName,
      firstName,
      lastName,
      additionalName,
      mobileNumber,
      taxtIdName,
      occupation,
      languageCode,
      notaryApprovalOfPhotoId,
      photoProofResidence,
      sex,
    } = data;

    await supabase.from("UserWithFiat").insert([
      {
        userName,
        firstName,
        lastName,
        additionalName,
        mobileNumber,
        taxtIdName,
        occupation,
        languageCode,
        notaryApprovalOfPhotoId,
        photoProofResidence,
        sex,
      },
    ]);
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
      <Typography variant="h4" >Update Information</Typography>
        <form onSubmit={updateProfile}>
          <FormControl>
            <TextField
              label='UserName'
              name="userName"
              type="text"
              value={data.userName}
              onChange={handleOnChange}
            />
            <TextField
              label={error.firstName === '' ? "First Name" : error.firstName}
              name="firstName"
              type="text"
              value={data.firstName}
              onChange={handleOnChange}
              color={error.firstName === '' ? "primary" : "secondary"}
            />
            <TextField
              label={error.lastName === '' ? "Last Name" : error.lastName}
              name="lastName"
              type="text"
              value={data.lastName}
              onChange={handleOnChange}
              color={error.lastName === '' ? "primary" : "secondary"}
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
              label="Taxt IDName"
              name="taxtIdName"
              type="text"
              value={data.taxtIdName}
              onChange={handleOnChange}
            />
            <TextField
              label="Occupation"
              name="occupation"
              type="text"
              value={data.occupation}
              onChange={handleOnChange}
            />
            <TextField
              label="Languaje Code"
              name="languageCode"
              type="text"
              value={data.languageCode}
              onChange={handleOnChange}
            />
            <TextField
              label="Notary Approval Of PhotoID"
              name="notaryApprovalOfPhotoId"
              className={classes.button}
              type="text"
              value={data.notaryApprovalOfPhotoId}
              onChange={handleOnChange}
            />

            <TextField
              label="Photo Proof Residence"
              name="photoProofResidence"
              type="text"
              value={data.photoProofResidence}
              onChange={handleOnChange}
            />

          <FormControl component="fieldset">
            <FormLabel component="legend">{error.sex === '' ? 'Gender' : error.sex}</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" >
              <FormControlLabel value="Male" onClick={(value) => sexUser(value)} control={<Radio />} label="Male" />
              <FormControlLabel value="Female" onClick={(value) => sexUser(value)} control={<Radio />} label="Female" />
              <FormControlLabel value="Other" onClick={(value) => sexUser(value)} control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" disabled={!submit} variant="contained" color="primary"> Send </Button>
        </FormControl>
      </form>
    </Container>
  );
};
