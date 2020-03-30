import { useRouter } from "next/router";
import Link from "next/link";
import { withApollo } from "../../lib/apollo";

const countryPage = () => {
  const { iso3 } = useRouter().query;

  return (
    <div>
      <h1> Page with iso3 in /country {iso3}</h1>
      <p>This page will show the coronavirus data of {iso3} country</p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default withApollo({ ssr: true })(countryPage);
