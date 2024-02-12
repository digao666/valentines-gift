import "./App.css";

function App() {
  return (
    <>
      <div className="title">
        <h1>Stardew Valley Fishing Simulator</h1>
        <p>Happy Valentines dear Sarah. I have made this game just for you!</p>
      </div>
      <div className="game-box">
        <iframe width={820} height={620} src="./game.html"></iframe>
      </div>
    </>
  );
}

export default App;
