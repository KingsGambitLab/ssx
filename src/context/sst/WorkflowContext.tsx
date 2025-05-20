"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { useWorkflowApi } from "@hooks/useWorkflowApi";
import useToken from "@hooks/useToken";

import {
  fetchAllWorkflowStepsResponse,
  fetchWorkflowStepResponse,
} from "../../types/sst/workflow";

type WorkflowContextType = {
  currentStep: { id: number, label: string } | undefined;
  paymentPlanId: number | undefined;
  isCouponDisabled: boolean;
  applicationFeesAmount: number | undefined;
  applicationFeesCurrency: string;
  programId: number | undefined;
  fetchAllWorkflowSteps: () => Promise<fetchAllWorkflowStepsResponse | undefined>;
  fetchCurrentWorkflowStep: (workflowStepId: number) => Promise<fetchWorkflowStepResponse | undefined>;
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowContextProvider = ({ children }: { children: React.ReactNode }) => { 
  const [paymentPlanId, setPaymentPlanId] = useState<number | undefined>(undefined);
  const [isCouponDisabled, setIsCouponDisabled] = useState<boolean>(false);
  const [applicationFeesAmount, setApplicationFeesAmount] = useState<number | undefined>(undefined);
  const [applicationFeesCurrency, setApplicationFeesCurrency] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<{id: number, label: string} | undefined>(undefined);
  const [isFetchWorkflowStepsLoading, setIsFetchWorkflowStepsLoading] = useState<boolean>(false);
  const [programId, setProgramId] = useState<number | undefined>(undefined);
  const [isFetchCurrentWorkflowStepLoading, setIsFetchCurrentWorkflowStepLoading] = useState<boolean>(false);

  const { data: token } = useToken();
  const { fetchAllWorkflowStepsApi, fetchCurrentWorkflowStepApi, fetchPaymentPlanApi } = useWorkflowApi();

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
    const paymentPlanResponse = await fetchPaymentPlanApi(paymentPlanId);

    console.log("Payment plan response:", paymentPlanResponse?.data[0]?.attributes?.prepaidAmount);

    setPaymentPlanId(paymentPlanId as number);
    setIsCouponDisabled(paymentPlanResponse?.data[0]?.meta?.couponDisabled || false);
    setApplicationFeesAmount(paymentPlanResponse?.data[0]?.attributes?.prepaidAmount || undefined);
    setApplicationFeesCurrency(paymentPlanResponse?.data[0]?.attributes?.currency || '');
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

      setProgramId(programData?.attributes?.id);

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

  const value = React.useMemo(() => ({ 
    currentStep,
    paymentPlanId,
    isCouponDisabled,
    applicationFeesAmount,
    applicationFeesCurrency,
    programId,
    fetchAllWorkflowSteps,
    fetchCurrentWorkflowStep,
  }), [
    currentStep,
    paymentPlanId,
    isCouponDisabled,
    applicationFeesAmount,
    applicationFeesCurrency,
    programId,
    fetchAllWorkflowSteps,
    fetchCurrentWorkflowStep
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
