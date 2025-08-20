import { useEffect } from "react";

export default function useFlutterwaveCheckout() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkout = (config) => {
    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout(config);
    } else {
      console.error("Flutterwave script not loaded yet");
    }
  };

  return checkout;
}
