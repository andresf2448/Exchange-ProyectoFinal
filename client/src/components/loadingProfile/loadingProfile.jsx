import React, { useState } from "react";
import { supabase } from "supabase/supabase";

export const LoadingProfile = () => {
  const session = supabase.auth.session();
  const { user } = session;
  let id_user = user.id;
  
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
  }

  return (
    <div>
      <form onSubmit={updateProfile}>
        <div>
          <input
            name="firstName"
            type="text"
            placeholder="firstname"
            value={data.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            name="lastName"
            type="text"
            placeholder="lastName"
            value={data.lastName}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <input
            name="additionalName"
            type="text"
            placeholder="additionalName"
            value={data.additionalName}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <input
            placeholder="mobileNumber"
            name="mobileNumber"
            type="text"
            value={data.mobileNumber}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="occupation"
            name="occupation"
            type="text"
            value={data.occupation}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="gender"
            name="gender"
            type="text"
            value={data.gender}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit"> enviar</button>
      </form>
    </div>
  );
};

