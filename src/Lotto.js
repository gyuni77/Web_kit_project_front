import React, { useState } from "react";

function App() {
  const [number, setNumber] = useState([]);
  const [bonus, setBonus] = useState(null);

  const clickBtn = () => {
    const candidate = Array(45)
      .fill()
      .map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      const random = Math.floor(Math.random() * candidate.length);
      const spliceArray = candidate.splice(random, 1);
      const value = spliceArray[0];
      shuffle.push(value);
    }
    const winningBall = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonusBall = shuffle[6];

    setNumber(winningBall);
    setBonus(bonusBall);
  };

  return (
    <div>
      <h1>로또 추첨기</h1>
      <div id="result">당첨 번호: {number.join(",")}</div>
      <div id="bonus">보너스 번호: {bonus}</div>
      <button onClick={clickBtn}>추첨 시작</button>
      <div>
        <a
          href="https://dhlottery.co.kr/gameInfo.do?method=buyLotto"
          style={{ textDecoration: "none", color: "skyblue" }}
        >
          로또 구매
        </a>
      </div>
    </div>
  );
}

export default App;
