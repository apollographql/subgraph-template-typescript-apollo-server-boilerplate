import { Resolvers } from "../__generated__/resolvers-types";

export const Thing: Resolvers = {
  Thing: {
    __resolveReference(parent, _context) {
      return { id: parent.id, name: "Name" };
    },
  },
};
