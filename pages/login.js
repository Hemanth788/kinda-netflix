import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
export default function Login() {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("login useEffect");
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (event) => {
    event.preventDefault();
    if (email) {
      if (email === "788hemanthvur@gmail.com") {
        try {
          setIsLoading(true);
          const DIDToken = await magic.auth.loginWithMagicLink({
            email: email,
          });
          console.log("DIDToken", DIDToken);
          if (DIDToken) {
            router.push("/");
          }
        } catch (error) {
          console.log("Magical Error", error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUserMsg("Temp Email is to be entered");
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a Valid email address");
    }
  };

  const handleOnChangeEmail = (event) => {
    setUserMsg("");
    const email = event.target.value;
    setEmail(email);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                width={"111px"}
                height={"30px"}
                src={"/static/netflix.svg"}
                alt="netflix logo"
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="Email address"
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? "Signing you in..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
}
