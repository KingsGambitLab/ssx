import { CaseUtil } from "@lib";
import { HttpMethods } from "@utils/common/apiHelper";
import { UG_PROGRAM_SLUG } from "@utils/sst/constants";
import { API_BASE_URL } from "@utils/common/url";
import {
  fetchAllWorkflowStepsResponse,
  fetchPaymentPlanResponse,
  fetchWorkflowStepResponse
} from "../types/sst/workflow";
import { useApi } from "./useApi";

const ENDPOINTS = {
  ALL_WORKFLOW_STEPS_DETAILS: `${API_BASE_URL}/api/v3/programs/${UG_PROGRAM_SLUG}/workflow_steps/?workflow_group_slug=school-of-tech-v3`,
  CURRENT_WORKFLOW_STEP: (stepId: number) => `${API_BASE_URL}/api/v3/programs/${UG_PROGRAM_SLUG}/workflow_steps/${stepId}/?workflow_group_slug=school-of-tech-v3`,
  PAYMENT_PLAN_DETAILS: (paymentPlanId: number) => `${API_BASE_URL}/api/v3/payments/plans/${paymentPlanId}`,
  APPLY_COUPON: `${API_BASE_URL}/programs/referrals`,
  PAYMENT_PLAN_ORDER: `${API_BASE_URL}/payments/order`
}

export const useWorkflowApi = () => {
  const { request } = useApi();

  const fetchAllWorkflowStepsApi = async () => {
    try {
      const response = await request<fetchAllWorkflowStepsResponse>(
        HttpMethods.GET,
        `${ENDPOINTS.ALL_WORKFLOW_STEPS_DETAILS}`,
      );

      if (!response) {
        throw new Error('No response received');
      }

      const formattedResponse = CaseUtil.toCase('camelCase', response) as fetchAllWorkflowStepsResponse;

      console.log("Formatted response:", formattedResponse);
      return formattedResponse;
    } catch (error) {
      console.error('Error fetching workflow steps:', error);
      throw error;
    }
  }

  const fetchCurrentWorkflowStepApi = async (nextId: number) => {
    try {
      const response = await request<fetchAllWorkflowStepsResponse>(
        HttpMethods.GET,
        ENDPOINTS.CURRENT_WORKFLOW_STEP(nextId),
      );

      if (!response) {
        throw new Error('No response received');
      }

      const formattedResponse = CaseUtil.toCase('camelCase', response) as fetchWorkflowStepResponse;
      console.log("Current workflow step response:", formattedResponse);
      return formattedResponse;
    } catch (error) {
      console.error('Error fetching current workflow step:', error);
      throw error;
    }
  }

  const fetchPaymentPlanApi = async (paymentPlanId: number) => {
    try {
      const response = await request<fetchPaymentPlanResponse>(
        HttpMethods.GET,
        ENDPOINTS.PAYMENT_PLAN_DETAILS(paymentPlanId),
      );

      if (!response) {
        throw new Error('No response received');
      }

      const formattedResponse = CaseUtil.toCase('camelCase', response) as fetchPaymentPlanResponse;
      return formattedResponse;
    } catch (error) {
      console.error('Error fetching payment plan:', error);
      throw error;
    }
  }

  const applyCouponApi = async (couponCode: string, paymentPlanId: number) => {
    try {
      const response = await request<any>(
        HttpMethods.POST,
        ENDPOINTS.APPLY_COUPON,
        {
          coupon_code: couponCode,
          plan_id: paymentPlanId,
          program_slug: UG_PROGRAM_SLUG,
        }
      );

      if (!response) {
        throw new Error('No response received');
      }

      return response;
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  }

  const paymentPlanCouponApi = async ({
    paymentPlanId,
    payingForType,
    payingForId,
    couponCode
  }: {
    paymentPlanId: number,
    payingForType: string,
    payingForId: number,
    couponCode?: string
  }) => {

    const params = {
      payment_plan_id: paymentPlanId,
      paying_for_type: payingForType,
      paying_for_id: payingForId,
      ...(couponCode && { coupon_code: couponCode }),
    }

    try {
      const response = await request<any>(
        HttpMethods.GET,
        ENDPOINTS.PAYMENT_PLAN_ORDER,
        params
      );

      if (!response) {
        throw new Error('No response received');
      }

      return response;
    } catch (error) {
      console.error('Error fetching payment plan coupon:', error);
      throw error;
    }
  }

  return {
    fetchAllWorkflowStepsApi,
    fetchCurrentWorkflowStepApi,
    fetchPaymentPlanApi,
    applyCouponApi,
    paymentPlanCouponApi
  }
}