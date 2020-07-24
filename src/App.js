import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecoginition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import "tachyons";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "e29027aef5654c768845d9814a7fe79a",
});

const particleOption = {
  particles: {
    number: {
      value: 250,
    },
    size: {
      value: 2,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box:{},
      route: 'signin'
    };
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row*height),
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  };

  onRouteChange = (route) =>{
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles params={particleOption} className="particle" />
        <Navigation onRouteChange = {this.onRouteChange}/>
        <Logo />
        { this.state.route === 'signin' ?
        <SignIn onRouteChange = {this.onRouteChange}/>
        : <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl} />
          </div>}
      </div>
    );
  }
}

export default App;
