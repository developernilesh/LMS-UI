import toast from "react-hot-toast";
import image from "../../assets/Logo/Favicon.png";
import endpoints from "../apiEndpoints";
import apiConnector from "../apiConnector";
import { setLoading } from "../../redux/slices/loaderSlice";

const {
  CAPTURE_PAYMENT_API,
  SEND_PAYMENT_SUCCESSFUL_EMAIL_API,
  VERIFY_PAYMENT_API,
} = endpoints;

export const payWithRazorpay = async (
  courses,
  user,
  navigate,
  dispatch,
  fetchCartItems,
  fetchUserDetails
) => {
  const courseIds = [];
  courses.forEach((item) => courseIds.push(item._id));
  if (courseIds.length === 0) {
    toast.error("No course selected for enrollment!");
    return;
  }

  const toastId = toast.loading("Processing Payment...");
  try {
    // loading the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
    const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT_API, {
      courseIds,
    });
    if (orderResponse?.data?.success) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        currency: orderResponse?.data?.paymentDetails?.currency,
        amount: `${orderResponse?.data?.paymentDetails?.amount}`,
        order_id: orderResponse?.data?.paymentDetails?.id,
        name: "LearnVerse",
        description: "Thank You for Purchasing!",
        image: image,
        prefill: {
          name: `${user?.firstName || ""} ${user?.lastName || ""}`,
          email: user?.email || "",
          contact: user?.additionalDetails?.contact,
        },
        handler: function (response) {
          sendPaymentSuccessEmail(response, orderResponse);
          verifyPayment(
            response,
            courseIds,
            navigate,
            dispatch,
            fetchCartItems,
            fetchUserDetails
          );
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed. Please try again!");
      });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  } finally {
    toast.dismiss(toastId);
  }
};

const verifyPayment = async (
  response,
  courseIds,
  navigate,
  dispatch,
  fetchCartItems,
  fetchUserDetails
) => {
  dispatch(setLoading(true));
  try {
    const paymentResponse = await apiConnector("POST", VERIFY_PAYMENT_API, {
      razorpayOrderid: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      courses: courseIds,
    });
    if (paymentResponse?.data?.success) {
      toast.success(paymentResponse?.data?.message);
      navigate("/dashboard/enrolled-courses");
      fetchCartItems();
      fetchUserDetails();
    }
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    dispatch(setLoading(false));
  }
};

const sendPaymentSuccessEmail = async (response, orderResponse) => {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESSFUL_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount: orderResponse?.data?.paymentDetails?.amount,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const loadScript = (source) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = source;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
