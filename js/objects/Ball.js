import React from 'react';
import {
	View,
  Image,
  StyleSheet,
} from 'react-native';
import Device from 'utils/Device';
import px from 'utils/PixelSizeFixer';
import Matter from 'matter-js';
import {
  Body,
} from 'react-game-kit/native';
import BodyComponent from 'objects/proto/BodyComponent'

const BALL_SIZE = (50);

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
      ballAngle: 0,
    };
	}
	componentWillMount() {
  }
	getBallStyles() {
	    return {
	      
	      transform: [
	        { translateX: this.state.ballPosition.x - BALL_SIZE/2 },
	        { translateY: this.state.ballPosition.y -BALL_SIZE/2  },
	        { rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
	      ],
	    };
	  }
	render() {
    //console.log('>>>', this.context.scale)
		return (
			<Body
        isStatic={!true}
        label='BALL'
              shape="circle"
              args={[Device.width / 4, 0, BALL_SIZE/2]}
              density={0.5}
              friction={0}
              frictionStatic={0}
              restitution={0}
              ref={(b) => { 
                if (!b) return;  
                this.body = b; 
                //console.log('AAA', b)  
              }}

            >
             
                <Image
                  source={require('images/ball.png')}
                  style={[styles.ball, this.getBallStyles()]}
                />
      
              
            </Body>
		)
	}
}

var styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    width: BALL_SIZE, 
    height: BALL_SIZE,
  }
})