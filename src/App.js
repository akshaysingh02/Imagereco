import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecoginition/FaceRecognition";
import "tachyons";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "e29027aef5654c768845d9814a7fe79a",
});

const particleOption = {
  particles: {
    number: {
      value: 200,
    },
    size: {
      value: 1,
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
      route: 'signin',
      issignedin: false,
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
    if(route === 'signout'){
      this.setState({issignedin: false})
    }
    else if(route=== 'home'){
      this.setState({issignedin: true})
    }
    this.setState({route: route});
  }

  render() {
    const { issignedin, imageUrl ,box ,route } = this.state;
    return (
      <div className="App">
        <Particles params={particleOption} className="particle" />
        <Navigation issignedin = {issignedin} onRouteChange = {this.onRouteChange}/>
        <Logo />
        { route === 'home'
          ? <div>
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box = {box} imageUrl={imageUrl} />
            </div> 
          : (
            route ==='signin'
            ? <SignIn onRouteChange = {this.onRouteChange}/> 
            : <Register onRouteChange = {this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
