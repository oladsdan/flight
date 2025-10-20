// import React, { useEffect, useState } from "react";
// import axios from "axios";

export default function PaymentComplete() {
  // const [message, setMessage] = useState("Verifying payment...");

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const id = params.get("transaction_id");
  //   const status = params.get("status");

  //   if (!id) {
  //     setMessage("No transaction ID found.");
  //     return;
  //   }

  //   if (status === "cancelled") {
  //     setMessage("Payment was cancelled.");
  //     return;
  //   }

  //   axios.get(`/api/payments/verify?id=${id}`)
  //     .then(res => {
  //       if (res.data.verified) {
  //         setMessage(`Payment confirmed for booking ${res.data.bookingId}. Thank you!`);
  //       } else {
  //         setMessage("We could not confirm your payment. Please contact support.");
  //       }
  //     })
  //     .catch(() => setMessage("Error verifying payment."));
  // }, []);
  // i need a div at the center of the screen with message that says "Payment Verified", and a button to go back to home page
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Payment Verified</h1>
      <p>Your payment has been successfully verified. Thank you for your booking!</p>
      <a href="/" style={{ textDecoration: "none", color: "white", backgroundColor: "#007bff", padding: "10px 20px", borderRadius: "5px" }}>Go to Home Page</a>
    </div>
  );  
  
}
