import React, { Component, Fragment } from "react";

class MainSite extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first_player_name: "",
            first_player_image_src: "",
            first_player_fppg: 0,
            second_player_name: "",
            second_player_image_src: "",
            second_player_fppg: 0,
            user_selected: false,
            container_a: false,
            container_b: false,
            points: "hidden",
            global_score: 0,
            win_message_display: "none",
            button_display: "static"
        }
    }

    componentDidMount() {
        this.load_players();
    }

    load_players = () => {
        fetch("https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json")
        .then(results => results.json())
        .then(obj => {

            let player_1_random = Math.floor(Math.random() * obj.players.length - 1)+ 1;
            let player_2_random = Math.floor(Math.random() * obj.players.length - 1)+ 1;

            if (player_1_random !== player_2_random) {
                this.setState({
                    data: obj.players,
                    first_player_name: obj.players[player_1_random]["first_name"],
                    first_player_image_src: obj.players[player_1_random]["images"]["default"]["url"],
                    first_player_fppg: obj.players[player_1_random]["fppg"],
                    second_player_name: obj.players[player_2_random]["first_name"],
                    second_player_image_src: obj.players[player_2_random]["images"]["default"]["url"],
                    second_player_fppg: obj.players[player_2_random]["fppg"],
                });
            }

            else {
                this.load_players()
            }
        })
    }

    main_function = (e) => {
        
        switch(e.currentTarget.id) {
            
            case "player_A":
                if(this.state.user_selected === false) {
                    this.setState({
                        container_a: "2px blue solid",
                        points: "visible",
                        user_selected: true
                    });

                    if (this.state.first_player_fppg > this.state.second_player_fppg) {
                        this.setState({
                            global_score: this.state.global_score + 1
                        })
                    }

                    if (this.state.global_score === 9) {
                        this.setState({
                            win_message_display: "block",
                            button_display: "none"
                        });
                    }
                }
                break;
            
            case "player_B":
                if(this.state.user_selected === false) {
                    this.setState({
                        container_b: "2px blue solid",
                        points: "visible",
                        user_selected: true
                    });

                    if (this.state.second_player_fppg > this.state.first_player_fppg) {
                        this.setState({
                            global_score: this.state.global_score + 1
                        });
                    }

                    if (this.state.global_score === 9) {
                        this.setState({
                            win_message_display: "block",
                            button_display: "none"
                        });
                    }
                }
                break;
            default:
        }
    }

    reset = () => {
        this.setState({
            user_selected: false,
            container_a: false,
            container_b: false,
            points: "hidden",
        });
        this.load_players();
    }

    render() {
        return (
            <Fragment>
                <div id="outer-container">
                    <div id="inner-container">
                        <div id="player-container">
                            <h2 id="title">Guess The Higher FPPG</h2>
                            <div className="row">
                                <div className="column">
                                    <div id="player_A" className="info-container" onClick={this.main_function} style={{border: this.state.container_a}}>
                                        <h1> {this.state.first_player_name} </h1>
                                        <img src= {this.state.first_player_image_src} alt="player" />
                                        <p className="fppg_value" style={{visibility: this.state.points}}> FPPG: <br /> {this.state.first_player_fppg} </p>
                                    </div>
                                </div>
                                <div className="column">
                                    <div id="player_B" className="info-container" onClick={this.main_function} style={{border: this.state.container_b}}>
                                        <h1> {this.state.second_player_name} </h1>
                                        <img src= {this.state.second_player_image_src} alt="player" />
                                        <p className="fppg_value" style={{visibility: this.state.points}}> FPPG: <br /> {this.state.second_player_fppg} </p>
                                    </div>
                                </div>
                            </div>

                            <h1>Goal: 10</h1>
                            <h1>Your Score: <span id="score"> {this.state.global_score} </span></h1>
                            <h1 style={{display: this.state.win_message_display}}>Win!</h1>

                            <button id="btn" style={{display: this.state.button_display}} onClick={this.reset}>Try Again</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MainSite;