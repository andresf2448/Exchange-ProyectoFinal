export const pollDepositUntilComplete = async ({
  popup,
  transactionId,
  token,
  sep24TransferServerUrl,
}) => {
  const TransactionStatus = {
    COMPLETED: "completed",
    ERROR: "error",
    INCOMPLETE: "incomplete",
    PENDING_ANCHOR: "pending_anchor",
    PENDING_CUSTOMER_INFO_UPDATE: "pending_customer_info_update",
    PENDING_EXTERNAL: "pending_external",
    PENDING_RECEIVER: "pending_receiver",
    PENDING_SENDER: "pending_sender",
    PENDING_STELLAR: "pending_stellar",
    PENDING_TRANSACTION_INFO_UPDATE: "pending_transaction_info_update",
    PENDING_TRUST: "pending_trust",
    PENDING_USER: "pending_user",
    PENDING_USER_TRANSFER_START: "pending_user_transfer_start",
  };
  let currentStatus = TransactionStatus.INCOMPLETE;

  const transactionUrl = new URL(
    `${sep24TransferServerUrl}/transaction?id=${transactionId}`
  );

  const endStatuses = [
    TransactionStatus.PENDING_EXTERNAL,
    TransactionStatus.COMPLETED,
    TransactionStatus.ERROR,
  ];

  while (!popup.closed && !endStatuses.includes(currentStatus)) {
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch(transactionUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    // eslint-disable-next-line no-await-in-loop
    const transactionJson = await response.json();

    if (transactionJson.transaction.status !== currentStatus) {
      currentStatus = transactionJson.transaction.status;
      // eslint-disable-next-line no-param-reassign
      popup.location.href = transactionJson.transaction.more_info_url;

      switch (currentStatus) {
        case TransactionStatus.PENDING_USER_TRANSFER_START: {
          console.log(
            "The anchor is waiting on you to take the action described in the popup"
          );

          break;
        }
        case TransactionStatus.PENDING_ANCHOR: {
          console.log("The anchor is processing the transaction");

          break;
        }
        case TransactionStatus.PENDING_STELLAR: {
          console.log("The Stellar network is processing the transaction");

          break;
        }
        case TransactionStatus.PENDING_EXTERNAL: {
          console.log(
            "The transaction is being processed by an external system"
          );
          break;
        }
        case TransactionStatus.PENDING_USER: {
          console.log(
            "The anchor is waiting for you to take the action described in the popup"
          );
          break;
        }
        case TransactionStatus.ERROR: {
          console.log("There was a problem processing your transaction");
          break;
        }
        default:
      }
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (!endStatuses.includes(currentStatus) && popup.closed) {
    console.log(
      `The popup was closed before the transaction reached a terminal status, if your balance is not updated soon, the transaction may have failed.`
    );
  }

  return { currentStatus };
};
