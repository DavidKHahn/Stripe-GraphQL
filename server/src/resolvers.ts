import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      // console.log('session: ', req.session);
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;
      return user;
    },
    // source represents credit card
    createSubscription: async (_, { source, ccLast4 }, { req }) => {
      // checks if users have user id or session available
      if (!req.session || !req.session.userId) {
        throw new Error("Not Authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user) {
        throw new Error();
      }

      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.PLAN
      });

      user.stripeId = customer.id;
      user.type = "paid";
      user.ccLast4 = ccLast4;
      await user.save();

      return user;
    },
    changeCreditCard: async (_, { source, ccLast4 }, { req }) => {
      // checks if users have user id or session available
      if (!req.session || !req.session.userId) {
        throw new Error("Not Authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user || !user.stripeId || user.type === "paid") {
        throw new Error();
      }
      // updates credit card info
      await stripe.customers.update(user.stripeId, { source });

      user.ccLast4 = ccLast4;
      await user.save();

      return user;
    },
    cancelSubscription: async (_, __, { req }) => {
      // checks if users have user id or session available
      if (!req.session || !req.session.userId) {
        throw new Error("Not Authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user || !user.stripeId || user.type === "paid") {
        throw new Error();
      }

      const stripeCustomer = await stripe.customers.retrieve(user.stripeId);

      const [subscription] = stripeCustomer.subscriptions.data;

      await stripe.subscriptionItems.del(subscription.id);

      await stripe.customers.deleteCard(
        user.stripeId,
        stripeCustomer.default_source as string
      );

      return user;
    }
  }
};
