import React, { useState } from "react";
import { supabase } from "supabase/supabase";

export const LoadingProfile = () => {
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

  function handleOnChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const sexUser = (e) => {
    setData({
      ...data,
      sex: e.target.id,
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

  return (
    <div>
      <span>Update Information</span>
      <form onSubmit={updateProfile}>
        <div>
          <label>UserName</label>
          <input
            name="userName"
            type="text"
            value={data.userName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>firstName</label>
          <input
            name="firstName"
            type="text"
            value={data.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>lastName</label>
          <input
            name="lastName"
            type="text"
            value={data.lastName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>additional Name</label>
          <input
            name="additionalName"
            type="text"
            value={data.additionalName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>mobile Number</label>
          <input
            name="mobileNumber"
            type="text"
            value={data.mobileNumber}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>taxt IdName</label>
          <input
            name="taxtIdName"
            type="text"
            value={data.taxtIdName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>occupation</label>
          <input
            name="occupation"
            type="text"
            value={data.occupation}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>language Code</label>
          <input
            name="languageCode"
            type="text"
            value={data.languageCode}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>notary Approval Of Photold</label>
          <input
            name="notaryApprovalOfPhotoId"
            type="text"
            value={data.notaryApprovalOfPhotoId}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>photo Proof Residence</label>
          <input
            name="photoProofResidence"
            type="text"
            value={data.photoProofResidence}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>Sex </label>

          <div>
            <label>Male</label>
            <input name="sex" id="Male" type="radio" onChange={sexUser} />
          </div>
          <div>
            <label>feminine</label>
            <input name="sex" id="Feminine" type="radio" onChange={sexUser} />
          </div>
        </div>

        <button type="submit">{"send"}</button>
      </form>
    </div>
  );
};
