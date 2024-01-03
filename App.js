import {React, Component, createRef} from "react";
import "./styles.css";
import Lottie from "lottie-react";
import lineAnimation from "./assets/poly-line-animate.json";
import previewAnimation from "./assets/preview-animate.json"
import {Annyang} from "annyang";

class MyApp extends Component {
    constructor(props){
        super(props);
        this.state = {showPlay: true, showPreview: false, requestHide: false, lottieRef: createRef(), lottieRef_2: createRef(), voiceInput:"", lottieRef_2: createRef()};
        this.handlePlayChange = this.handlePlayChange.bind(this);
        this.handlePlayHover = this.handlePlayHover.bind(this)
        this.handlePreviewClick = this.handlePreviewClick.bind(this)
        this.handlePreviewDisable = this.handlePreviewDisable.bind(this)
        this.PreviewDisable = this.PreviewDisable.bind(this)
        this.LineApp = this.LineApp.bind(this);
        this.PreviewApp = this.PreviewApp.bind(this);
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
        this.state.lottieRef_2.current.play();
    };
    handlePreviewDisable = () => {
        this.state.lottieRef_2.current.setDirection(-1);
        this.state.lottieRef_2.current.play();
        this.setState({requestHide: true});
    };
    PreviewDisable = () => {
        if (this.state.requestHide == true) this.setState({showPreview: false});
    };
    log = () => {
    };
    startListening = () => {
        annyang.start({autoRestart: true, continuous: false});
        annyang.setLanguage('es-US');
        annyang.addCallback('result', (phrases) => {
            this.setState({voiceInput: phrases[0]})
        });
    };
    stopListening = () => {
        annyang.abort();
    }
    LineApp = () =>
        <Lottie lottieRef={this.state.lottieRef} style={this.lineStyle} animationData={lineAnimation} loop={false} autoplay={false}/>;
    PreviewApp = () =>
        <Lottie lottieRef={this.state.lottieRef_2} style={this.lineStyle} animationData={previewAnimation} loop={false} autoplay={false} onComplete={this.PreviewDisable}/>;
    render() {
            return (
                <div className="desktop-master"> 
                    <div className="desktop-1">
                    <div className="div">
                        <div className={this.state.showPreview ? "preview-master-vis" : "preview-master-op"}>
                            <button className="btn-vis" onClick={this.handlePreviewDisable}><this.PreviewApp/></button>
                        </div>
                        <div className="box-media text">
                             Voice Input: {this.state.voiceInput}
                        </div>
                        <div className="poly-parent">  
                            <button className="poly-circle"/>
                            <div className="line-parent">
                                <this.LineApp/>
                            </div>
                        </div>
                        <button className="poly-circle-2"/>
                        <button className="poly-circle-3" />
                        {/* <button className="box" />
                        <button className="box-2" />
                        <button className="box-3" /> */}
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