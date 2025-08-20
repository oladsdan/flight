import dotenv from  "dotenv"
import Flutterwave from "flutterwave-node-v3";

dotenv.config();



const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const bookings = new Map();

function makeTxRef(bookingId, custermerId) {
  return `trip_${custermerId}_${bookingId}_${Date.now()}`;
}

//initialize payment
export const initializePayment = async (req, res) => {
    const { bookingId, amount, currency = "NGN", customer } = req.body;

    const {id: custormerId} = req.user || {}

  const tx_ref = makeTxRef(bookingId, custormerId);

  bookings.set(tx_ref, {
    amount: Number(amount),
    currency,
    bookingId,
    status: "pending",
    customer
  });

  res.json({
    publicKey: process.env.FLW_PUBLIC_KEY,
    txRef: tx_ref,
    amount: Number(amount),
    currency,
    bookingId,
    customer,
    // Use your real absolute URL in prod
    redirectUrl: `${process.env.CLIENT_URL}/payment-complete`
  });

}

// verify after redirect

export const verifyPayment = async (req, res) => {
   try {
    const id = req.query.id; // Flutterwave transaction_id
    if (!id) return res.status(400).json({ error: "Missing transaction id" });

    const result = await flw.Transaction.verify({ id });
    // result.data contains Flutterwave's transaction info
    if (result.status !== "success") {
      return res.status(400).json({ verified: false, reason: "Verification failed" });
    }

    const data = result.data;
    const tx_ref = data.tx_ref;
    const record = bookings.get(tx_ref);

    // Defensive checks: status, amount, currency, and idempotency
    const paidOk = data.status === "successful"
      && record
      && Number(data.amount) === Number(record.amount)
      && data.currency === record.currency;

    if (paidOk) {
      if (record.status !== "paid") {
        record.status = "paid";
        record.transactionId = data.id;
        // TODO: mark booking as paid in your DB, issue tickets, send email, etc.
      }
      return res.json({ verified: true, bookingId: record.bookingId, tx_ref, transactionId: data.id });
    }

    return res.status(400).json({ verified: false, reason: "Mismatch or not successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Verification error" });
  }

}


//aA webhook receiver
// export const webhookReceiver = async (req, res) => {
//   const signature = req.headers["verif-hash"];
//   if (!signature || signature !== process.env.FLW_WEBHOOK_HASH) {
//     return res.sendStatus(401);
//   }

//   // Always 200 quickly so Flutterwave stops retrying
//   res.sendStatus(200);

//   try {
//     const event = req.body;
//     const id = event?.data?.id;
//     if (!id) return;

//     // Verify the transaction again server-side
//     const result = await flw.Transaction.verify({ id });
//     if (result.status !== "success") return;

//     const data = result.data;
//     const tx_ref = data.tx_ref;
//     const record = bookings.get(tx_ref);

//     const paidOk = data.status === "successful"
//       && record
//       && Number(data.amount) === Number(record.amount)
//       && data.currency === record.currency;

//     if (paidOk && record.status !== "paid") {
//       record.status = "paid";
//       record.transactionId = data.id;
//       // TODO: finalize booking, notify customer, etc.
//     }
//   } catch (err) {
//     console.error("Webhook handling error:", err);
//   }
// }