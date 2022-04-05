import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { magic } from "../../lib/magic-client";

export default function NavBar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const handleOnClickHome = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (event) => {
    event.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (event) => {
    event.preventDefault();
    setShowDropdown((p) => !p);
  };

  const handleSignout = async (event) => {
    event.preventDefault();
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      if (!(await magic.user.isLoggedIn())) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error Logging Out");
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        email && setUsername(email);
      } catch (error) {
        console.log("Error retrieving Email", error);
      }
    };
    fetchEmail();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username} onClick={handleShowDropdown}>
                {username}
                <Image
                  width={"24px"}
                  height={"24px"}
                  src={"/static/expand_more.svg"}
                  alt="expand_more_chevron"
                ></Image>
              </p>
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Signout
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
