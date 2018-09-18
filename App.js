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
   this.initPanResponder();
   this.startInterval()
  }

  startInterval() {
    this.inter = setInterval(()=>{
      if (this.state.balls.length == 1) clearInterval(this.inter)
      //console.log('GO');
      this.addBall();
    }, 6000)
  }

  addBall = () => {
    var {balls} = this.state;
    balls.push(<Ball key={balls.length} />);
    this.setState(balls);
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  initPanResponder = () => {
      this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {

       //console.log('GRANT')
        
        //this.startForceIncrease();
        
      },
      onPanResponderMove: (evt, gestureState) => {
        //console.log('MOVE', evt.nativeEvent.changedTouches)
        this.setState({lastTouchEvents: evt.nativeEvent.changedTouches })
      },
      onPanResponderRelease: (evt, gestureState) => {


        
        //this.stopForceIncrease();

        // Matter.Body.applyForce(this.body.body, {
        //   x: this.body.body.position.x,
        //   y: this.body.body.position.y,
        // }, {
        //   x: gestureState.vx,
        //   y: gestureState.vy,
        // });
      },
    });
  }

  render() {
    const dimensions = Device;
    return (
      <View 
        {...this._panResponder.panHandlers}
      >
      <ImageBackground 
        source={require('images/bg-stripes.png')} 
        style={{width: '100%', height: '100%'}} 
        resizeMode='cover' 
        
      >
      <Image 
        source={require('images/head.png')} 
        style={{width: '80%', position: 'absolute', height: '50%', top: '25%', left: '10%'}} 
        resizeMode='contain'  
      />
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
            gravity={{ x: 0, y: 1, scale: 0.001 }}
          >
            <Hand type={0} collision={this.state.collision} lastTouchEvents={this.state.lastTouchEvents} />
            <Hand type={1} collision={this.state.collision} lastTouchEvents={this.state.lastTouchEvents}  />
            {
              this.state.balls
            }
           
          </World>
       
        {/*
        </Stage>
      */}
       
      </Loop>
      </ImageBackground>
      </View>
    );
  }
}