//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import ScoresButton from "./components/ScoresButton";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [time, setTime] = useState(0);
  const [startGame, setStartGame] = useState(false);

  useInterval(
    () => {
      // Your custom logic here
      setTime(time + 1);
    },
    startGame ? delay : null
  );

  const handleScore = props => {
    const [teamScore, setTeamScore, points] = props;
    setPoints(points);
    setTeamScore(teamScore + points);
  };

  function handleClick(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{time}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
          <button className="timerButtons" onClick={() => setStartGame(true)}>Start Game</button>
          <button className="timerButtons" onClick={() => setStartGame(false)}>Stop Game</button>
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <ScoresButton
            className="homeButtons__touchdown"
            points2={3}
            handleScore={() => handleScore([homeScore, setHomeScore, 7])}
            team={[homeScore, setHomeScore]}
            text={"Home Touchdown"}
          />
          <ScoresButton
            points={3}
            className="homeButtons__fieldGoal"
            handleScore={() => handleScore([homeScore, setHomeScore, 3])}
            text={"Home Field Goal"}
          />
        </div>
        <div className="awayButtons">
          <ScoresButton
            className="awayButtons__touchdown"
            handleScore={() => handleScore([awayScore, setAwayScore, 7])}
            text={"Away Touchdown"}
          />
          <ScoresButton
            className="awayButtons__fieldGoal"
            handleScore={() => handleScore([awayScore, setAwayScore, 3])}
            text={"Away Field Goal"}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
