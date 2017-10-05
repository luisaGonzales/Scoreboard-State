'use strict';
let players = [
	{
		name: "Jim Hoskins",
		score: 31,
		id:  Utils.uuid()
	},
	{
		name: "Andree Hoskins",
		score: 35,
		id:  Utils.uuid()
	},
	{
		name: "Alena Hoskins",
		score: 42,
		id:  Utils.uuid()
	},
];

class Model {
	constructor(){
		this.render = undefined;
		this.players = players;
		this.inputValue = "";
		
	}
	suscribe(render){
		this.render = render;
	}
	inform(render){
		this.render();
	}
	getScores (players){
		return players.map((player) =>{
			return (player.score);
		});
		this.inform()
	}
	sumScore (players){
		let scores = this.getScores(players);
		return scores.reduce((prev,current) =>{
			return prev + current;
		},0);
		this.inform();
	}
	addPlayer(player){
		this.players.push({
			name: player,
			score: 0,
			id: Utils.uuid()
		});
		this.inputValue = "";
		this.inform();
	}
	decrement(player){
		let pos = player.target.id;
		if(this.players[pos].score > 0){
			this.players[pos].score = this.players[pos].score - 1
		}
		this.inform();
	}
	increment(player){
		let pos = player.target.id;
		this.players[pos].score = this.players[pos].score + 1
		this.inform();
	}
	delete(e){
		let pos = e.target.id;
		this.players.splice(pos, 1);
		this.inform();
	}
	onChange(e){
		this.inputValue = e.target.value;
		this.inform();
	}
	// timer(){
	// 	this.time = this.time + 1;
	// 	this.inform();
	// }
	// startTime(e){
	// 	this.t = setInterval(
	// 		() => {this.timer()}, 1000
	//   )
	// this.inform();
	// }
	// resetTime(e){
	// 	clearInterval(this.t);
	// 	this.time = 0;
	// 	this.inform();
	// }
	// stopTime(e){
	// 	clearInterval(this.t);
	// 	this.inform();
	// }
}

class Timer extends React.Component{


	constructor(){
		super()
		this.t = undefined;
		this.state = {
			time : 0
		}
	}
	timer(){
		this.setState({
			time : this.state.time + 1
		});
	}
	startTime(){
		this.t = setInterval(() => {this.timer()}, 1000);
	}
	resetTime(){
		clearInterval(this.t);
		this.time = 0;
		this.setState({
			time : 0,
		});
	}
	stopTime(){

	}
	render(){
		return (
			<div className="stopwatch">
				<h2>STOPWATCH</h2>
				<div className="stopwatch-time">
					{this.state.time}
				</div>
				<div>
					<button onClick={(e) => {this.startTime(e)}}><strong>START</strong></button>
					<button onClick={(e) => {this.stopTime(e)}}><strong>STOP</strong></button>
					<button onClick={(e) => {this.resetTime(e)}}><strong>RESET</strong></button>
				</div>
			</div>
		);
	}
}

// const Timer = (props) => {
// 	return (
// 		<div className="stopwatch">
// 			<h2>STOPWATCH</h2>
// 			<div className="stopwatch-time">
// 				{props.model.time}
// 			</div>
// 			<div>
// 				<button onClick={(e) => {props.model.startTime()}}><strong>START</strong></button>
// 				<button onClick={(e) => {props.model.stopTime()}}><strong>STOP</strong></button>
// 				<button onClick={(e) => {props.model.resetTime()}}><strong>RESET</strong></button>
// 			</div>
// 		</div>
// 	);
// }

const Header = (props) => {
  	return(
		<div className="header">
			<div className="stats">
				<table>
					<tbody>
						<tr>
							<td>Player: </td>
							<td className="letter"><strong>{props.model.players.length}</strong></td>
						</tr>
						<tr>
							<td>Total Points: </td>
							<td className="letter"><strong>{props.model.sumScore(props.model.players)}</strong></td>
						</tr>
					</tbody>
				</table>
			</div>
			<h1><strong>{props.title}</strong></h1>
			<Timer/>
		</div>
  	);
} 

const PlayerList = (props) => {
	const allPlayers = props.model.players.map((player, index)=>{
		return (
			<div className="player" key={player.id}>
				<div className="player-name" id={index} onDoubleClick={e => {props.model.delete(e)}}>
					<center><strong>{player.name}</strong></center> 
				</div>
				<div className="player-score counter">
					<div className="counter-action decrement" id={index} onClick={e => {props.model.decrement(e)}}>
						-
					</div>
					<div className="counter-score">
						{player.score}
					</div>
					<div className=" counter-action increment" id={index} onClick={e => {props.model.increment(e)}} >
						+
					</div>
				</div>
			</div>
		);
	  });
	return (
	  <div>{allPlayers}</div> 
  );
}

const PlayerForm = (props) => {
  return (
	<div className="add-player-form">
		<form onSubmit={e => {
			e.preventDefault();
			props.model.addPlayer(props.model.inputValue);
			props.model.inform();
		}}>
			<input onChange={(e) => {props.model.onChange(e)}} value={props.model.inputValue} type="text"placeholder="ENTER A NAME" />
			<input type="submit" value="ADD PLAYER"/>
		</form>
	</div>
  );
}

let model = new Model();

const Application = ({title, model}) => {
   return (
	 <div className="scoreboard">
		<Header title={title} model={model}/>
		<PlayerList model={model}/>
		<PlayerForm model={model}/>
	  </div>      
   );
}

let render = () => {
	ReactDOM.render(<Application title="Scoreboard" model={model}/>, document.getElementById('container'));
};

model.suscribe(render);
render();

