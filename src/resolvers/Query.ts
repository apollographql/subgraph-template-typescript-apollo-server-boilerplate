import { Resolvers } from "../__generated__/resolvers-types";

export const Query: Resolvers = {
  Query: {
    thing(_parent, { id }, _context) {
      return { id: id.toString(), name: "Name" };
    },
  },
};
