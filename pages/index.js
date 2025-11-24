import styles from "../styles/Home.module.css";

function Home() {
  var content = (
    <main className={styles.stage}>
      <image
        src="/resources/background-construction.jpg"
        alt="Em construção"
        className={styles.fill}
      />
    </main>
  );
  return content;
}

export default Home;
