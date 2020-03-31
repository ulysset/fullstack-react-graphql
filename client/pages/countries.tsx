import Link from "next/link";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GetCountriesQuery, GetCountriesQueryVariables } from "../types";

// Write here the graphql query to fetch the list of all available countries
// We only need "name" and "iso3" key.
const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      name
      iso3
    }
  }
`;

const CountriesPage = () => {
  // Here we will use the graphql query to get the data
  const { loading, error, data } = useQuery<
    GetCountriesQuery,
    GetCountriesQueryVariables
  >(GET_COUNTRIES);
  if (loading) return <div>Loading.............</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <h1>/countries page</h1>
      <p>This page will show a list of all the available countries</p>
      <ul>
        {data.countries.map((country, index) => (
          <li key={index}>
            <Link href={"/country/" + country.iso3}>
              <a>{country.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// "withApollo" allows us to use Apollo client in this component/page
export default withApollo({ ssr: true })(CountriesPage);
