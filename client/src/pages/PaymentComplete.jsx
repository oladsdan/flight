import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentComplete() {
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("transaction_id");
    const status = params.get("status");

    if (!id) {
      setMessage("No transaction ID found.");
      return;
    }

    if (status === "cancelled") {
      setMessage("Payment was cancelled.");
      return;
    }

    axios.get(`/api/payments/verify?id=${id}`)
      .then(res => {
        if (res.data.verified) {
          setMessage(`Payment confirmed for booking ${res.data.bookingId}. Thank you!`);
        } else {
          setMessage("We could not confirm your payment. Please contact support.");
        }
      })
      .catch(() => setMessage("Error verifying payment."));
  }, []);

  return <div>{message}</div>;
}
