import {React, Component, createRef} from "react";
import "./styles.css";
import Lottie from "lottie-react";
import lineAnimation from "./assets/poly-line-animate.json";
import previewAnimation from "./assets/preview-animate-long.json"
import axios from 'axios';
import Spline from '@splinetool/react-spline'

class MyApp extends Component {
    constructor(props){
        super(props);
        this.state = {showPlay: true, showPreview: false, requestHide: false, gameReady: false, begin: 0, end: 130, lottieRef: createRef(), lottieRef_2: createRef(), voiceInput_WPR:""};
        this.handlePlayChange = this.handlePlayChange.bind(this);
        this.handlePlayHover = this.handlePlayHover.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.handlePreviewDisable = this.handlePreviewDisable.bind(this);
        this.PreviewDisable = this.PreviewDisable.bind(this);
        this.GameReady = this.GameReady.bind(this);
        this.LineApp = this.LineApp.bind(this);
        this.PreviewApp = this.PreviewApp.bind(this);
        this.GameApp = this.GameApp.bind(this);
        this.whisperListening = this.whisperListening.bind(this);
        this.startListening = this.startListening.bind(this);
        this.stopListening = this.stopListening.bind(this);
        this.lineStyle = {height: 1024, width: 1440};
    }

    handlePlayChange = () => {
        this.setState({showPlay: !(this.state.showPlay)});
        if (this.state.showPlay) {this.startListening();} else {this.stopListening();}
    };
    handlePlayHover = () => {
        this.state.lottieRef.current.play();
    };
    handlePreviewClick = () => {
        this.setState({requestHide: false});
        this.setState({showPreview: true});
        this.state.lottieRef_2.current.setDirection(1);
        this.state.lottieRef_2.current.playSegments([this.state.begin,this.state.end], true);
    };
    handlePreviewDisable = () => {
        this.state.lottieRef_2.current.setDirection(-1);
        this.state.lottieRef_2.current.playSegments([this.state.end,this.state.begin], true);
        this.setState({requestHide: true});
    };
    PreviewDisable = () => {
        if (this.state.requestHide == true) this.setState({showPreview: false});
    };
    GameReady = () => {
        this.setState({gameReady: true});
    };
    log = () => {
    };
    async whisperListening(flag, path) {
        try {
            const response = await axios.post('http://localhost:5000/S2T', {
                flag: flag,
                path: path,
            });
            // Save the token to local storage
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.setState({voiceInput_WPR: response.data});
        } catch (error) {
            console.error(error);
        }
    };
    startListening = () => {
        this.whisperListening('False', "./assets/common_voice_es_19610612.mp3");
    };
    stopListening = () => {
    };
    LineApp = () =>
        <Lottie lottieRef={this.state.lottieRef} style={this.lineStyle} animationData={lineAnimation} loop={false} autoplay={false}/>;
    PreviewApp = () =>
        <Lottie lottieRef={this.state.lottieRef_2} style={this.lineStyle} animationData={previewAnimation} loop={false} autoplay={false} onComplete={this.PreviewDisable}/>;
    GameApp = () => 
        <Spline scene="https://prod.spline.design/LlpNLeIs-Vj9YRH7/scene.splinecode" onLoad={this.GameReady}/>;
    render() {
            return (
                <div className="desktop-master"> 
                    <div className="desktop-1">          
                    <div className="div">
                        <div className={this.state.showPreview ? "preview-master-vis" : "preview-master-op"}>
                            <button className="btn-vis" onClick={this.handlePreviewDisable}>
                                <this.PreviewApp/>
                            </button> 
                        </div>
                        <div className={this.state.showPreview ? "game-master-vis": "game-master-op"}>
                            <this.GameApp/>
                        </div>   
                        <div className="box-media text">
                             Voice Input Whisper: {this.state.voiceInput_WPR}
                        </div>
                        <div className="poly-parent">  
                            <button className="poly-circle"/>
                            <div className="line-parent">
                                <this.LineApp/>
                            </div>
                        </div>
                        <button className="poly-circle-2"/>
                        <button className="poly-circle-3" />
                        <button className="box-4" />
                        <button className="box-5" />
                        <button className="box-6" onClick={this.handlePreviewClick}/>
                        <button className="box-7" />
                        <button className={this.state.showPlay ? "btn-play": "btn-pause"} onClick={this.handlePlayChange} onMouseOver={this.handlePlayHover}>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <clipPath id="play">
                                        <path d="M34 22.5L0.25 0.416351L0.25 44.5836L34 22.5Z" fill="#D9D9D9"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <clipPath id="pause"> 
                                    <path d="M0.25 27L0.25 0.416199H10.25L10.25 27H0.25ZM10.25 0.416199L10.25 44.5835H0.25L0.25 0.416199H10.25ZM0.25 44.5835L0.25 27H10.25L10.25 44.5835H0.25Z" fill="#D9D9D9"/>                
                                    <path d="M 20.25 27 L 20.25 0.4162 H 30.25 L 30.25 27 H 20.25 Z M 30.25 0.4162 L 30.25 44.5835 H 20.25 L 20.25 0.4162 H 30.25 Z M 20.25 44.5835 L 20.25 27 H 30.25 L 30.25 44.5835 H 20.25 Z" fill="#D9D9D9"/>         
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
            );
        }
    }

export default MyApp;