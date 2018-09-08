import React from 'react';
import {
	View,
	PanResponder,

} from 'react-native';
import Device from 'utils/Device';
import Matter from 'matter-js';
import {
  Body,
} from 'react-game-kit/native';
import BodyComponent from 'objects/proto/BodyComponent'

export default class Ball extends BodyComponent {

  update = () => {
  	//console.log('this.body', this.body)
  	if (!this.body) return;
  	//console.log('this.body.body.position', this.body.body.position)
  	this.setState({
       ballPosition: this.body.body.position,
       ballAngle: this.body.body.angle,
     });
    // tick logic
  };

	constructor(props) {
		super(props);
		this.state = {
      //gravity: 1,
      ballPosition: {
        x: 0,
        y: 0,
      },
      ballAngle: 45,
    };
	}
	componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          //gravity: 0,
        });

        Matter.Body.setAngularVelocity(this.body.body, 0);
        Matter.Body.setVelocity(this.body.body, {x: 0, y: 0});

        this.startPosition = {
          x: this.body.body.position.x,
          y: this.body.body.position.y,
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        Matter.Body.setPosition(this.body.body, {
          x: this.startPosition.x + gestureState.dx,
          y: this.startPosition.y + gestureState.dy,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          //gravity: 1,
        });

        Matter.Body.applyForce(this.body.body, {
          x: this.body.body.position.x,
          y: this.body.body.position.y,
        }, {
          x: gestureState.vx,
          y: gestureState.vy,
        });
      },
    });
  }
	getBallStyles() {
	    return {
	      height: 75,
	      width: 75,
	      position: 'absolute',
	      transform: [
	        { translateX: this.state.ballPosition.x },
	        { translateY: this.state.ballPosition.y },
	        { rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
	      ],
	    };
	  }
	render() {
		return (
			<Body
              shape="circle"
              args={[100, Device.height - 275, 75]}
              density={0.003}
              friction={1}
              frictionStatic={0}
              restitution={0.5}
              ref={(b) => { if (b) this.body = b; }}
            >
             
              <View
                style={this.getBallStyles()} {...this._panResponder.panHandlers}
              >
                <View style={{backgroundColor: '#009900', height: 75, width: 75}} />
              {/*
                <Image
                  source={require('./assets/basketball.png')}
                  height={75}
                  width = {75}
                />
              */}
              </View>
              
            </Body>
		)
	}

}