import React, { Component } from 'react';
import { Image, Dimensions, View, ImageBackground,} from 'react-native';
import {
  Loop,
  Stage,
  World,
} from 'react-game-kit/native';

import Ball from 'objects/Ball';
import Borders from './js/Borders'
export default class Game extends Component {

  // handleUpdate = () => {
  //   this.setState({
  //     ballPosition: this.body.body.position,
  //     ballAngle: this.body.body.angle,
  //   });
  // }

  
  constructor(props) {
    super(props);

    this.state = {
      gravity: 1,
      // ballPosition: {
      //   x: 0,
      //   y: 0,
      // },
      // ballAngle: 0,
    };
  }

  

  

  render() {
    const dimensions = Dimensions.get('window');
    return (
      <ImageBackground source={require('images/raw/bg.jpg')} style={{width: '100%', height: '100%'}} resizeMode='cover' >
      <Loop>
       
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          //style={{ backgroundColor: '#3a9bdc' }}
        >
        
          <World
            onInit={this.physicsInit}
            //onUpdate={this.handleUpdate}
            gravity={{ x: 0, y: this.state.gravity, scale: 0.001 }}
          >
         
            <Ball />
            
          </World>
           
        </Stage>
       
      </Loop>
      </ImageBackground>
    );
  }
}