import { Resolvers } from '../__generated__/resolvers-types';
import { ProcessPaymentArgs } from './args';
import processNetAuthorizedPayment from '../cybersource/pay';

export const Mutation: Resolvers = {
  Mutation: {
    processPayment(_: any, args: ProcessPaymentArgs, __: any) {
      return processNetAuthorizedPayment(args);
    },
  },
};
