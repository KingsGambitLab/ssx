/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

import { toast } from 'react-toastify';

import { useWorkflowApi } from "@hooks/useWorkflowApi";
import useToken from "@hooks/useToken";

import {
  fetchAllWorkflowStepsResponse,
  fetchWorkflowStepResponse,
  RazorpayResponse,
} from "../../types/sst/workflow";

import { PAYMENT_MODAL_CONFIG } from "@utils/razorpay/constants";
import { razorpayPaymentWindow } from "@utils/razorpay";
import { CaseUtil } from "@lib";

type WorkflowContextType = {
  currentStep: { id: number, label: string } | undefined;
  paymentPlanId: number | undefined;
  isCouponDisabled: boolean;
  discountedAmount: number;
  couponCode: string | undefined;
  applicationFeesAmount: number | undefined;
  applicationFeesCurrency: string;
  isFetchCurrentWorkflowStepLoading: boolean;
  programId: number | undefined;
  fetchUserCurrentCouponCode: () => Promise<void>;
  applyingCoupon: boolean;
  paymentStatus: 'initial' | 'success' | 'failed';
  setPaymentStatus: (status: 'initial' | 'success' | 'failed') => void;
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  startPaymentProcess: () => Promise<void>;
  fetchStepDetails: (stepIds: number[]) => Promise<any>;
  fetchAllWorkflowSteps: () => Promise<fetchAllWorkflowStepsResponse | undefined>;
  fetchCurrentWorkflowStep: (workflowStepId: number) => Promise<fetchWorkflowStepResponse | undefined>;
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowContextProvider = ({ children }: { children: React.ReactNode }) => { 
  const [paymentPlanId, setPaymentPlanId] = useState<number | undefined>(undefined);
  const [isCouponDisabled, setIsCouponDisabled] = useState<boolean>(false);
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [applyingCoupon, setApplyingCoupon] = useState<boolean>(false);
  const [applicationFeesAmount, setApplicationFeesAmount] = useState<number | undefined>(undefined);
  const [applicationFeesCurrency, setApplicationFeesCurrency] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<{id: number, label: string} | undefined>(undefined);
  const [isFetchWorkflowStepsLoading, setIsFetchWorkflowStepsLoading] = useState<boolean>(false);
  const [programId, setProgramId] = useState<number | undefined>(undefined);
  const [paymentStatus, setPaymentStatus] = useState<'initial' | 'success' | 'failed'>('initial');
  const [isFetchCurrentWorkflowStepLoading, setIsFetchCurrentWorkflowStepLoading] = useState<boolean>(false);

  const { data: token } = useToken();
  const {
    fetchAllWorkflowStepsApi,
    fetchCurrentWorkflowStepApi,
    fetchPaymentPlanApi,
    applyCouponApi,
    paymentPlanCouponApi,
    removeCouponApi,
    fetchUserCurrentCouponCodeApi,
    fetchStepDetailsApi
  } = useWorkflowApi();

  const setCurrentWorkflowStepId = (
    current: number,
    next: number,
    nextCustomData: { optional?: boolean },
    currentStatus: string
  ) => {
    if (nextCustomData?.optional === true || currentStatus === 'failed') {
      setCurrentStep({id: current, label: ''});
    } else {
      setCurrentStep({id: next, label: ''});
    }
  }

  const setCurrentWorkflowStepLabel = (label: string) => {
    if (currentStep) {
      setCurrentStep({ ...currentStep, label });
    }
  }

  const processPaymentPlanData = async (paymentPlanId: number) => {
    const paymentPlanResponse = await fetchPaymentPlanApi(paymentPlanId);;

    setPaymentPlanId(paymentPlanId as number);
    setIsCouponDisabled(paymentPlanResponse?.data[0]?.meta?.couponDisabled || false);
    setApplicationFeesAmount(paymentPlanResponse?.data[0]?.attributes?.prepaidAmount || undefined);
    setApplicationFeesCurrency(paymentPlanResponse?.data[0]?.attributes?.currency || '');
  }

  const applyCoupon = async (couponCode: string) => {
    if (!couponCode) {
      return;
    }

    try {
      setApplyingCoupon(true);
        await applyCouponApi(couponCode, paymentPlanId as number);

        const response = await paymentPlanCouponApi({
          paymentPlanId: paymentPlanId as number,
          payingForType: 'Program',
          payingForId: programId as number,
          couponCode: couponCode
        });

        if (response?.success) {
          setDiscountedAmount(response?.amount / 100);
          setCouponCode(couponCode);
        }
      } catch (error: any) {
        let message = 'We are unable to process your request right now.'
          + ' Please try again in sometime.';
        if (error?.status === 422) {
          message = CaseUtil.titleCase(error?.response?.data?.result)
            || "Invalid Coupon Code";
        }
        toast.error(message);
      } finally {
        setApplyingCoupon(false);
      }
   }

  const removeCoupon = async () => {
    try {
      setApplyingCoupon(true);
      const response = await removeCouponApi(paymentPlanId as number);
      console.log("Remove coupon response:", response);
      if (response?.transaction?.result === 'success') {
        setDiscountedAmount(0);
        setCouponCode(undefined);
      }
    } catch (error) {
      console.error("Error removing coupon:", error);
    } finally {
      setApplyingCoupon(false);
    }
  }

  const fetchUserCurrentCouponCode = async () => {
    try {
      const response = await fetchUserCurrentCouponCodeApi(paymentPlanId as number, couponCode);
      if (response?.success) {
        console.log("User current coupon code:", response?.couponCode);
        setCouponCode(response?.couponCode);
        await applyCoupon(response?.couponCode);
      }
    } catch (error) {
      console.error("Error fetching user current coupon code:", error);
    }
  }

  const fetchAllWorkflowSteps = useCallback(async () => {
    if (!token || isFetchWorkflowStepsLoading) {
      return;
    }

    try {
      setIsFetchWorkflowStepsLoading(true);
      const response = await fetchAllWorkflowStepsApi();
      console.log("Workflow steps fetched:", response);
      
      setCurrentWorkflowStepId(
        response?.meta.current,
        response?.meta.next,
        response?.meta.nextCustomData,
        response?.meta.currentStatus || ''
      );

      const programData = response?.included?.find(
        (item: any) => item?.attributes?.ownerType === 'Program'
      );

      setProgramId(programData?.attributes?.ownerId);

      return response;
    } catch (err) {
      console.error("Error fetching all workflow steps:", err);
    } finally {
      setIsFetchWorkflowStepsLoading(false);
    }
  }, [token, fetchAllWorkflowStepsApi]);

  const fetchCurrentWorkflowStep = useCallback(async (workflowStepId: number) => {
    if (!token || isFetchCurrentWorkflowStepLoading) {
      return;
    }

    try {
      setIsFetchCurrentWorkflowStepLoading(true);
      const response = await fetchCurrentWorkflowStepApi(workflowStepId);
      
      if (response) {
        const currentStepLabel = response?.data?.attributes?.label || '';
        const paymentPlanId = currentStepLabel === 'APPLICATION_FEE'
          ? response?.included?.find(
            (item: any) => item?.attributes?.ownerType === 'PaymentPlan'
          )?.attributes?.ownerId : null;

        setCurrentWorkflowStepLabel(currentStepLabel);
        if (paymentPlanId) {
          processPaymentPlanData(paymentPlanId);
        }
      }

      return response;
    } catch (err) {
      console.error("Error fetching current workflow step:", err);
    } finally {
      setIsFetchCurrentWorkflowStepLoading(false);
    }
  }, [token, isFetchCurrentWorkflowStepLoading, fetchCurrentWorkflowStepApi]);

  const startPaymentProcess = async () => { 
    try {
      //1. we are fetching coupon details for current payment plan
      const response = await paymentPlanCouponApi({
        paymentPlanId: paymentPlanId as number,
        payingForType: 'Program',
        payingForId: programId as number,
        couponCode: couponCode
      });

      if (response?.success) { 
        const discountedAmount = applicationFeesAmount ?
          response?.amount === applicationFeesAmount * 100 ? 0 : response?.amount / 100 : 0;

        setDiscountedAmount(discountedAmount);

        //2. we are fetching razorpay api
        const razorpayResponse = await razorpayPaymentWindow({
          ...response,
          ...PAYMENT_MODAL_CONFIG
        },
          { coupon_code: couponCode }
        ) as RazorpayResponse;
        
        //3. after razorpay payment, set payment status
        if (razorpayResponse?.success) { 
          setPaymentStatus('success');
          toast.success('Payment Completed successfully');
        } else {
          setPaymentStatus('failed');
          toast.error('payment verification failed');
        }

        console.log("Razorpay response:", razorpayResponse);
      } else {
        toast.error('We are unable to process your request right now.'
          + ' Please try again in sometime.');
      }
    } catch (error: any) {
      let message = 'We are unable to process your request right now.'
        + ' Please try again in sometime.';
      if (error.isFromRazorpay) { 
        message = error.message;
      } else if(error.responseJson && error.responseJson.message) {
        message = error.responseJson.message;
      }
      toast.error(message);
      setPaymentStatus('failed');
    }
  }

  const fetchStepDetails = async (stepIds: number[]) => {
    const response = await fetchStepDetailsApi(stepIds);
    console.log("Step details fetched:", response);
    return response;
  }

  const value = React.useMemo(() => ({ 
    currentStep,
    paymentPlanId,
    isCouponDisabled,
    applicationFeesAmount,
    applicationFeesCurrency,
    applyCoupon,
    discountedAmount,
    couponCode,
    programId,
    fetchAllWorkflowSteps,
    fetchCurrentWorkflowStep,
    removeCoupon,
    applyingCoupon,
    fetchUserCurrentCouponCode,
    startPaymentProcess,
    paymentStatus,
    setPaymentStatus,
    fetchStepDetails,
    isFetchCurrentWorkflowStepLoading
  }), [
    currentStep,
    paymentPlanId,
    isCouponDisabled,
    applicationFeesAmount,
    applicationFeesCurrency,
    programId,
    discountedAmount,
    couponCode,
    fetchAllWorkflowSteps,
    fetchCurrentWorkflowStep,
    removeCoupon,
    applyingCoupon,
    fetchUserCurrentCouponCode,
    startPaymentProcess,
    paymentStatus,
    setPaymentStatus,
    fetchStepDetails,
    isFetchCurrentWorkflowStepLoading
  ]);

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

export function useWorkflowContext() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflowContext must be used within a WorkflowContextProvider');
  }
  return context;
}
