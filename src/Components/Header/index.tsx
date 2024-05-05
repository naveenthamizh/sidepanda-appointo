import React from "react";
import { CiShare1 } from "react-icons/ci";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import styles from "./header.module.css";
import { BUTTON_VARIANTS, Button } from "../../Common/Components/Button";

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <BsFillCalendar2DateFill
          size="40px"
          color="var(--colors-success-500)"
        />
        <div className={styles.companyName}>
          <div>Appointo</div>
          <div className={styles.slogan}>Appointo for appointments</div>
        </div>
      </div>
      <nav className={styles.actionBtn}>
        <li>Menu</li>
        <li>Contact us</li>
        <li>
          <Button
            variant={BUTTON_VARIANTS.LINK}
            leftIcon={
              <CiShare1 size="20px" color="var(--colors-success-700)" />
            }
          >
            <span className={styles.linkBtn}> Share link</span>
          </Button>
        </li>
      </nav>
    </header>
  );
}

export default Header;
