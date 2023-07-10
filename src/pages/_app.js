import "@/styles/globals.css";
import Layout from "@/components/Layout";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://ttrpg-data.netlify.app";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
