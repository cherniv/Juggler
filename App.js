import React, { Component } from 'react';
import { 
  Image, 
  View, 
  ImageBackground,
  PanResponder,
} from 'react-native';
import {
  Loop,
  Stage,
  World,
} from 'react-game-kit/native';

import Ball from 'objects/Ball';
import Hand from 'objects/Hand';
import Borders from './js/Borders'
import Device, {width, height} from 'utils/Device'
import Matter from 'matter-js';
import px from 'utils/PixelSizeFixer';

var i =0;
export default class Game extends Component {

  handleUpdate = () => {
    if (!this.engine || i > 0) return;
    console.log('Engine', this.engine)
    i ++;
   // var a = Matter.Composite.allComposites(Matter.World)
    //Matter.Composite.allBodies(Matter.World)
    // this.setState({
    //   ballPosition: this.body.body.position,
    //   ballAngle: this.body.body.angle,
    // });
  }

  worldInit = (engine) => {
    Borders.init(engine);
    this.engine = engine;

  }

  
  constructor(props) {
    super(props);

    this.state = {
      //gravity: 1,
      balls: [<Ball key={0} />],
      // ballPosition: {
      //   x: 0,
      //   y: 0,
      // },
      // ballAngle: 0,
    };
  }

  componentWillMount() {
   
   //this.startInterval()
  }

  startInterval() {
    this.inter = setInterval(()=>{
      //console.log('GO');
      this.addBall();
    }, 3000)
  }

  addBall = () => {
    var {balls} = this.state;
    balls.push(<Ball key={balls.length} />);
    this.setState(balls);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  render() {
    const dimensions = Device;
    return (
      <ImageBackground 
        source={require('images/raw/bg.jpg')} 
        style={{width: '100%', height: '100%'}} 
        resizeMode='cover' 
        
      >

      <Loop>
       
       {/*
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          //style={{ backgroundColor: '#3a9bdc' }}
        >
      */}
     
          <World
            onInit={this.worldInit}
            onCollision={(collision)=> {
              var {pairs} = collision;
              if (pairs[0].bodyA.label == "GROUND" || pairs[0].bodyB.label == "GROUND") {
                //this.addBall()
              };
              this.setState({collision})
            }}
            onUpdate={this.handleUpdate}
            //gravity={{ x: 0, y: this.state.gravity, scale: 0.001 }}
          >
          {
            this.state.balls
          }
            <Hand type={0} collision={this.state.collision} world={this.engine && this.engine.world} />
            <Hand type={1} collision={this.state.collision} world={this.engine && this.engine.world} />
           
            
          </World>
       
        {/*
        </Stage>
      */}
       
      </Loop>
      </ImageBackground>
    );
  }
}