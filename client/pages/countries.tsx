import Link from "next/link";
import { withApollo } from "../lib/apollo";

// Write here the graphql query to fetch the list of all available countries
// We only need "name" and "iso3" key.

const CountriesPage = () => {
  // Here we will use the graphql query to get the data
  return (
    <div>
      <h1>/countries page</h1>
      <p>This page will show a list of all the available countries</p>
      <ul>
        <li>
          <Link href={"/country/" + "FRA"}>
            <a>France</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

// "withApollo" allows us to use Apollo client in this component/page
export default withApollo({ ssr: true })(CountriesPage);
