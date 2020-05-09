const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Subscribtion {
  _id: ID!
  subscriber:User!
  profile: Profile!
  createdAt: String!
  updatedAt: String!
}

type Donation {
  _id: ID!
  subscriber:User!
  profile: Profile!
  createdAt: String!
  updatedAt: String!
}

type Profile {
    _id: ID!
    fullName: String!
    dateOfBirth: String!
    address: String!
    mobile: String!
    motherName: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}

type User {
  _id: ID!
  fullName: String!
  mobile: String!
  email: String!
  password: String
  country: String!
  createdAt: String!
  updatedAt: String!
  createdProfiles: [Profile!]
}

input ProfileInput {
    fullName: String!
    age: String!
    address: String!
    mobile: String!
    motherName: String!
}

input UserInput {
  fullName: String!
  mobile: String!
  email: String!
  password: String
  country: String!
}

type AuthData {
  userId:ID!
  token: String!
  expiration: Int!
}

type Query {
    profiles: [Profile!]!
    subscriptions:[Subscribtion!]!
    donations:[Donation!]!
    signIn(email: String, password: String): AuthData!
    userById(userById: ID!): User!
    profileById(profileById: ID!): Profile!
}

type Mutation {
    createProfile(profileInput: ProfileInput) : Profile
    signUp(userInput: UserInput) : User
    subscribe(profileId: String): Subscribtion
    unsubscribe(subscribtionId: String): Profile
  }
  
schema {
    query: Query
    mutation: Mutation
}

`);
