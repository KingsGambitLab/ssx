export type workflowGroupAndStepRelationship = {
  id: number;
  type: string;
  attributes: {
    id: string;
    label: string;
    order: number;
    status: string;
    createdAt: string;
  }
  relationships: {
    workflowGroup: {
      data: Array<{
        id: string;
        type: string;
      }>
    }
  }
}

export type workflowGroupDetails = {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    slug: string;
    ownerType: string;
    ownerId: number;
    currentStep: number | null;
    createdAt: string;
  }
  relationships: {
    workflowSteps: {
      data: Array<{
        id: string;
        type: string;
      }>
    }
  }
}

export type workflowStepMeta = {
  current: number;
  currentStatus: string | null;
  next: number;
  nextCustomData: any;
}

export type fetchAllWorkflowStepsResponse = {
  data: workflowGroupAndStepRelationship[];
  included: workflowGroupDetails[];
  meta: workflowStepMeta;
}

export type paymentPlan = {
  id: string;
  type: string; 
  attributes: {
    id: string;
    name: string;
    description: string;
    planType: string;
    prepaidAmount: number;
    currency: string;
  }
  meta: {
    couponDisabled?: boolean;
  }
}

export type fetchPaymentPlanResponse = {
  data: paymentPlan[];
}

export type workflowStepAndDefinitionRelationship = {
  id: string;
  type: string;
  attributes: {
    id: string;
    label: string;
    order: number;
    status: string;
    createdAt: string;
    userProgressStatus: string | null;
  },
  relationships: {
    workflowStepDefinitions: {
      data: Array<{
        id: string;
        type: string;
      }>
    }
  }
}

export type workflowStepDefinition = {
  id: number;
  type: string;
  attributes: {
    id: string;
    meta: object | null;
    ownerType: string;
    ownerId: number;
    createdAt: string;
    order: number;
  }
}

export type fetchWorkflowStepResponse = {
  data: workflowStepAndDefinitionRelationship;
  included: workflowStepDefinition[];
}