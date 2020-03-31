import { useRouter } from "next/router";
import Link from "next/link";
import { withApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BarChart from "../../components/BarChart";
import {
  GetCoronavirusDataQuery,
  GetCoronavirusDataQueryVariables
} from "../../types";
import { useState } from "react";
const GET_CORONAVIRUS_DATA = gql`
  query getCoronavirusData($iso3: String!) {
    coronavirus(iso3: $iso3) {
      iso3
      deaths
      confirmed
      recovered
    }
  }
`;
const countryPage = () => {
  const router = useRouter();
  // const { iso3 } = router.query;
  const [iso3, setIso3] = useState("FRA");
  const { loading, error, data } = useQuery<
    GetCoronavirusDataQuery,
    GetCoronavirusDataQueryVariables
  >(GET_CORONAVIRUS_DATA, { variables: { iso3: iso3 as string } });
  if (loading) return <div>Loading.............</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <h1> Page with iso3 in /country {iso3}</h1>
      <p>This page will show the coronavirus data of {iso3} country</p>
      <div>Deaths {data.coronavirus.deaths}</div>
      <div onClick={() => setIso3("USA")}>USA</div>
      <div onClick={() => setIso3("CHN")}>CHN</div>
      <BarChart
        width="100%"
        data={[
          { title: "deaths", value: data.coronavirus.deaths, color: "coral" },
          {
            title: "confirmed",
            value: data.coronavirus.confirmed,
            color: "lightblue"
          },
          {
            title: "recovered",
            value: data.coronavirus.recovered,
            color: "papayawhip"
          }
        ]}
      />
    </div>
  );
};

export default withApollo({ ssr: true })(countryPage);
