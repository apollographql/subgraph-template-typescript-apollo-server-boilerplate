import {
  MutationProcessPaymentArgs,
  ProcessPaymentResult,
  Resolvers,
} from '../__generated__/resolvers-types';
import processNetAuthorizedPayment from '../cybersource/pay';

export const Mutation: Resolvers = {
  Mutation: {
    processPayment(
      _: any,
      args: MutationProcessPaymentArgs,
      __: any
    ): ProcessPaymentResult {
      try {
        console.log('Payment started: ', args);
        const data = processNetAuthorizedPayment(args);
        console.log('Post payment process: ', data);
        return {
          success: true,
          message: 'Payment processed successfully',
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
};
