import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import Loading from "../components/loading/loading";
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = async () => {
      if (await magic.user.isLoggedIn()) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    isLoggedIn();
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
