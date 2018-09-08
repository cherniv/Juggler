import React from 'react';
import {
	View,
  Image,
} from 'react-native';
import Device from 'utils/Device';
import px from 'utils/PixelSizeFixer';
import Matter from 'matter-js';
import {
  Body,
} from 'react-game-kit/native';
import BodyComponent from 'objects/proto/BodyComponent'

const BALL_SIZE = px(40);

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
  }
	getBallStyles() {
	    return {
	      height: BALL_SIZE*2,
	      width: BALL_SIZE*2,
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
              args={[Device.width / 2, 0, BALL_SIZE]}
              density={0.003}
              friction={2}
              frictionStatic={1}
              restitution={0.5}
              ref={(b) => { if (b) this.body = b; }}
            >
             
              <View
                style={this.getBallStyles()}
              >
                
                <Image
                  source={require('images/ball.png')}
                  style={{width: BALL_SIZE*2.04, height: BALL_SIZE*2.04}}
                />
              </View>
              
            </Body>
		)
	}

}