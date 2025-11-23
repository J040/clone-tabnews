import styles from "../styles/Home.module.css";

function Home() {
  var content = (
    // <div>
    //   <img src="/resources/background-construction.jpg" />
    //   {/* <h1>Em construção....</h1> */}
    // </div>
    <main className={styles.stage}>
      <img
        src="/resources/background-construction.jpg"
        alt="Em construção"
        className={styles.fill}
      />
    </main>
  );
  return content;
}

export default Home;
