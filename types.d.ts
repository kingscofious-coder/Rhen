declare module 'react-paystack' {
  interface PaystackConfig {
    reference: string;
    email: string;
    amount: number;
    publicKey: string;
  }

  interface InitializePaymentParams {
    onSuccess: (reference: any) => void;
    onClose: () => void;
  }

  export function usePaystackPayment(config: PaystackConfig): (params: InitializePaymentParams) => void;
}
