import { Resolvers, Thing } from "../__generated__/resolvers-types";
export const Mutation: Resolvers = {
  Mutation: {
    createThing(_parent, { thing }, _context) {
      return { ...thing as Thing };
    },
  },
};
