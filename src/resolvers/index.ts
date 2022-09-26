import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Thing } from "./Thing";

const resolvers = {
  ...Query,
  ...Mutation,
  ...Thing,
};

export default resolvers;
