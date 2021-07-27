export const createPopup = (interactiveResponse) => {
  /* const url = new URL(popupUrl); */

  const { url } = interactiveResponse;
  console.log("este es el url para el popuppppppppppppp", interactiveResponse);
  console.log("este es el url para el popup", url);

  const popup = window.open(
    url,
    "popup",
    "width=400,height=450"
  );

  if (!popup) {
    throw new Error(
      "Popups are blocked. You’ll need to enable popups for this demo to work"
    );
  }

  return popup;
};
