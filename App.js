import React, { Component } from 'react';
import { Image, Dimensions, View, ImageBackground,} from 'react-native';
import {
  Loop,
  Stage,
  World,
} from 'react-game-kit/native';

import Matter from 'matter-js';
import Ball from 'objects/Ball';
export default class Game extends Component {

  // handleUpdate = () => {
  //   this.setState({
  //     ballPosition: this.body.body.position,
  //     ballAngle: this.body.body.angle,
  //   });
  // }

  physicsInit = (engine) => {

    const dimensions = Dimensions.get('window');

    const ground = Matter.Bodies.rectangle(
      dimensions.width / 2, dimensions.height + 5,
      dimensions.width, 5,
      {
        isStatic: true,
      },
    );

    const ceiling = Matter.Bodies.rectangle(
      dimensions.width / 2, -75,
      dimensions.width, 1,
      {
        isStatic: true,
      },
    );

    const leftWall = Matter.Bodies.rectangle(
      -75, dimensions.height / 2,
      1, dimensions.height,
      {
        isStatic: true,
      },
    );

    const rightWall = Matter.Bodies.rectangle(
      dimensions.width, dimensions.height / 2,
       1, dimensions.height - 5,
      {
        isStatic: true,
      },
    );

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);
  }

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