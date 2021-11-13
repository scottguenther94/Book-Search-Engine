const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async(parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({_id:context.user._id})

            return userData;
        }
        throw new AuthenticationError('You Need to be Logged in!')
    }
  },
  Mutation: {
    login: async(parent, {email, password}) =>{
        const user = await User.findOne({email});
        if (!user){
            throw new AuthenticationError('No user found with this email')
        }
        const token = signToken(user);
        return (token, user);
    },
    addUser: async (parent, {username, email, password}) =>{
        const user = await User.create({ username, email, password});
        const token = signToken(user);
        return {token, user};
    },
    saveBook: async(parent, {bookData}, context) =>{
        if (context.user){
            const updatedUser = await User.findOneAndUpdate(
                {_id: user._id},
                {$addToSet: {savedBooks: body}},
                {new: true, runValidators: true}
            );
            return updatedUser;
        }
        throw new AuthenticationError('You Need to be Logged In!')
    }
  }
};

module.exports = resolvers;
