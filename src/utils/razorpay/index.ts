/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_BASE_URL } from "@utils/common/url";
import { HttpMethods, apiRequest } from "@utils/common/apiHelper";

const razorpayScript = 'https://checkout.razorpay.com/v1/checkout.js';

const ENDPOINTS = {
  PAYMENT_VERIFY: `${API_BASE_URL}/payments/verify`,
};

const verifyPayment = async (orderParams: any, extra = {}) => {
  const params = { order_params: orderParams };
  
  const response = await apiRequest(
    HttpMethods.POST,
    ENDPOINTS.PAYMENT_VERIFY,
    {
      ...params,
      ...extra
    }
  );
  return response;
};

const loadScript = () => {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.src = razorpayScript;
      script.onload = () => resolve(true);
      script.onerror = () => {
        const loadError = new Error('Failed to load Razorpay SDK.');
        (loadError as any).isFromRazorpay = true;
        reject(loadError);
      };
      document.body.appendChild(script);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const loadError = new Error(
        'Unable to initiate razorpay client. Please try again in sometime!',
      );
      (loadError as any).isFromRazorpay = true;
      reject(loadError);
    }
  });
}

const initiatePayment = (
  options: any,
  verifyPaymentOptions = {},
  attributions = {},
) => {
  return new Promise((resolve, reject) => {
    try {
      const paymentOptions = {
        ...options,
        handler: (orderParams: any) => { 
          verifyPayment(orderParams, { ...verifyPaymentOptions, ...attributions })
            .then((response: any) => resolve(response))
            .catch((error: any) => reject(error));
        },
        modal: {
          ondismiss() {
            const error = new Error('Payment Process Cancelled.');
            (error as any).isFromRazorpay = true;
            reject(error);
          },
        },
      }

      const rzp = new (window as any).Razorpay(paymentOptions);
      rzp.on('payment.failed', (response: any) => {
        reject(response);
      });
      rzp.open();
    } catch (error) {
      reject(error);
    }
  });
}

export async function razorpayPaymentWindow(
  options: any,
  verifyPaymentOptions = {},
  attributions = {},
) {
  await loadScript();

  console.log("Razorpay options:", options);

  const paymentResponse = await initiatePayment(
    options, verifyPaymentOptions, attributions,
  );
  return paymentResponse;
}

export { loadScript };
