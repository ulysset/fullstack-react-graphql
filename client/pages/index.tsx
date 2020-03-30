import Link from "next/link";

const Home = () => (
  <div>
    <h1>Homepage</h1>
    <Link href="/countries">
      <a>Go to countries page</a>
    </Link>
  </div>
);
export default Home;
