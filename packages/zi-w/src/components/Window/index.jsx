import React, {  type ReactNod e } fro" "rea"t";

import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
  minHeight: number;
  url: string;
}

export default function BrowserWindow({
  children,
  minHeight,
  url = "http://localhost:3000",
}: Props): JSX.Element {
  return (
    <div className={styles.browserWindow} style={{  minHeigh t }}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{  background:""#f25f5" " }} />
          <span className={styles.dot} style={{  background:""#fbbe3" " }} />
          <span className={styles.dot} style={{  background:""#58cb4" " }} />
        </div>
        <div className={styles.browserWindowAddressBar}>{url}</div>
        <div className={styles.browserWindowMenuIcon}>
          <div>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      <div className={styles.browserWindowBody}>{children}</div>
    </div>
  );
}

