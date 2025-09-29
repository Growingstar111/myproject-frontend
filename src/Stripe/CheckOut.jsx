import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export const CheckOutForm = ({
  selectedAddress,
  selectedProducts,
  totalPrice,
  accountId,
}) => {
  console.log(selectedProducts,"selectedProducts?.quantity");
  
  // console.log(`${totalPrice}`, "ooooooooooooooooooo");
  // console.log(accountId, "acc idd");

  //why this total price is undifined
 const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  useEffect(() => {
    const fetchPaymentMEthods = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/payment/list-payment-methods",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPaymentMethods(response?.data);
    };
    fetchPaymentMEthods();
  }, []);
  
  console.log(paymentMethods?.data?.data, "payment method");
  console.log(selectedPaymentMethod,"selectedPaymentMethod");
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (selectedPaymentMethod) {
      const res = await axios.post(
        "http://localhost:5000/api/payment/create-payment",

        {
          amount: totalPrice * 100,
          currency: "inr",
          paymentMethodId: selectedPaymentMethod,
          accountId: accountId,
        },

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      
      if (res?.data?.data?.status == "succeeded") {
        const createorder = await axios.post(
          "http://localhost:5000/api/order/create-order",
          {
            addressId: selectedAddress,
            paymentMethodId:selectedPaymentMethod,
            products:selectedProducts,
            totalPrice: totalPrice,
          },

          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        Swal.fire({
          text: "Payment Successfull",
          icon: "success",
        });
        navigate('/customer/home')
        return createorder?.data;
      }
      setSelectedPaymentMethod(null);
      return res?.data;
    } else {
      const card = elements.getElement(CardElement);
      const tok = await stripe.createToken(card);
      const tokenId = tok?.token?.id;
      if (tok) {
        //api for sending tokenId of payment method
        const response = await axios.post(
          "http://localhost:5000/api/payment/post-token",
          { tokenId },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const paymentIntentResponse = await axios.post(
          "http://localhost:5000/api/payment/create-payment",

          {
            amount: totalPrice * 100,
            currency: "inr",
            paymentMethodId: response?.data?.data?.paymentMethodId,
            accountId: accountId,
          },

          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

      
        setSelectedPaymentMethod(null);
        console.log(
          paymentIntentResponse?.data?.data?.status,
          "<<<<<<<<<<<<<<<,,"
        );
  /**************************** Order */
        if (paymentIntentResponse?.data?.data?.status == "succeeded") {
          const createorder = await axios.post(
            "http://localhost:5000/api/order/create-order",
            {
              addressId: selectedAddress,
              paymentMethodId: response?.data?.data?.paymentMethodId,
              products:selectedProducts,
              totalPrice: totalPrice,
            },

            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          Swal.fire({
            text: "Payment Successfull",
            icon: "success",
          });
          navigate('/customer/home')
          return createorder?.data;
        }
        return paymentIntentResponse?.data;
  
        // alert(`${tok?.token?.id}`);
        // return response?.data;
      }
    }
    //generate order api........

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // const res = await fetch("/create-intent", {
    //   method: "POST",
    // });

    // const { client_secret: clientSecret } = await res.json()

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <div className="container  pt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="stripe-card bg-light p-4">
              <form onSubmit={handleSubmit} className="">
                {paymentMethods?.data?.data.length > 0 && (
                  <div className="mb-5">
                    <label
                      htmlFor="payment-method"
                      className="form-label bg-success rounded text-white text-center"
                    >
                      Select a saved payment method
                    </label>
                    <select
                      id="payment-method"
                      className="form-select"
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      <option value="">Select a payment method</option>
                      {paymentMethods?.data?.data?.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.card.brand} XXXX-XXXX-XXXX-{method.card.last4}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
               {!selectedPaymentMethod?<CardElement />: ""}
                

                <button
                  type="submit"
                  disabled={!stripe || !elements}
                  className="btnu py-1 text-center mt-2"
                >
                  Pay
                </button>
                {/* Show error message to your customers */}
                {errorMessage && <div>{errorMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
