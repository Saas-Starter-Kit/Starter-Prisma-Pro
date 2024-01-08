export type PortalSessionReqPropsT = {
  customer: string;
};

export type CreatePortalSessionPropsT = {
  customer: string;
  origin: string;
};

/* Stripe Checkout session types */

export type CreateCheckoutSessionPropsT = {
  price: string;
};

export type CheckoutSessionReqPropsT = {
  price: string;
};

// imported Stripe Event from 'stripe' type has outdated keys/values
export type StripeEvent = {
  type: string;
  data: {
    object: {
      id: string;
      metadata: {
        org_id: string;
      };
      subscription: string;
      status: string;
    };
    previous_attributes: object | null;
  };
};

export type CustomerPropsT = {
  customer: string;
  email: string;
};

export type CustomerReqPropsT = {
  customer: string;
  email: string;
};

export enum WebhookEventsE {
  CheckoutSessionCompleted = 'checkout.session.completed',
  CustomerSubscriptionUpdated = 'customer.subscription.updated'
}
