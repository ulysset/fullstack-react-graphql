// The code will come mostly from https://github.com/apollographql/apollo-server example.
// We will be getting the data from an external REST API although we are building a graphql API
// Link : https://covid19.mathdro.id/api/

import { ApolloServer, gql } from "apollo-server";
import dataCountries from "./data/countries.json";
import fetch from "isomorphic-unfetch";

// The GraphQL schema
const typeDefs = gql`
  type Country {
    name: String
    iso2: String
    iso3: String
  }
  type Coronavirus {
    iso3: String
    deaths: Int
    confirmed: Int
    recovered: Int
  }
  type Query {
    "A simple type for getting started!"
    hello: String
    "Get all the countries available"
    countries: [Country]!
    "Get coronavirus data by country"
    coronavirus(iso3: String!): Coronavirus!
  }
`;
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world world",
    countries: () => dataCountries,
    coronavirus: async (_parent, args) => {
      // Normally we should call a database

      const res = await fetch(
        "https://covid19.mathdro.id/api/countries/" + args.iso3
      );
      const data = await res.json();
      // fetch("https://covid19.mathdro.id/api/countries/USA")
      //   .then(res => res.json())
      //   .then(data => console.log({ data }));

      return {
        iso3: args.iso3,
        deaths: data.deaths.value,
        confirmed: data.confirmed.value,
        recovered: data.recovered.value
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
