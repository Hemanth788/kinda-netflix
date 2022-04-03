import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar(props) {
  const { username } = props;
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
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
                  <Link href="/login">
                    <a className={styles.linkName} onClick="/login">
                      Signout
                    </a>
                  </Link>
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
