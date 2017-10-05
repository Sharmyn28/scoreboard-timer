
class Model{
  constructor(){
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
      {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
      {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      },
    ];
    
    this.lengthA = this.players.length;
    this.inputValue = null;
    this.render = null;
  }

  subscribe(render) {
    this.render = render;
  }

  render() {
    this.render();
  }

  addPlayer (player) {
    this.players.push({
      name: player,
      score: 0,
      id: Utils.uuid()
    })
      //this.inputValue.value = '';
      console.log('aumenta usuario');
      this.render();
    
  }

  increasePoints (index) {
    console.log('aumenta');
    this.players[index].score ++;
    this.render();
  }

  decreasePoints (index){
    console.log('disminuye');
    this.players[index].score --;
    this.render();
  }
}

/******************** */

const Header = ({model}) => {
  return (
    <div>
      <header className='header'>
        <table className='stats'>
          <tbody>
            <tr><td>PLAYERS:</td><td>{model.players.length}</td></tr>
            <tr><td>TOTAL POINTS:</td><td>{model.players.map(a => a.score).reduce((a, b) => a + b)}</td></tr>
          </tbody>
        </table>
        <div className='stopwatch'>
          <h2>STOPWATCH</h2>
          <h1 className='stopwatch-time'>0</h1>
          <button>start</button><button>reset</button>
        </div>
      </header>
    </div>
  );
}
const PlayerList = ({model}) => {
  return (
    <div>
      {
        model.players.map((a, index) => {
          return <div className='player' key={index}>
            <div className='player-name'>{a.name}</div>
            <div className='player-score counter'>
              <button className='counter-action decrement' onClick={()=> model.decreasePoints(index)}>-</button>
              <span className='counter-score'>{a.score}</span>
              <button className='counter-action increment' onClick={()=> model.increasePoints(index)}>+</button>
            </div>
          </div>
        })
      }
    </div>
  );
}

const PlayerForm = ({model}) => {
  return (
    <div className='add-player-form'>
      <form onSubmit={e=>{
        e.preventDefault();
        model.addPlayer(model.inputValue);
        }}>
        <input type="text" placeholder='ENTER A NAME' onChange={e=>(model.inputValue = e.target.value)}/>
        <input type="submit" value='add player'/>
      </form>
    </div>
  );
}
//
/****** */

const ScoreBoardApp = ({title, model}) => {
  return ( 
    <div className='scoreboard'>
      <Header model={model} />
      <PlayerList model={model} />
      <PlayerForm model={model} />
    </div>
  );
}

let model = new Model();
let counter = 1;

let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <ScoreBoardApp title="ScoreBoard App" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render); 

render(); 