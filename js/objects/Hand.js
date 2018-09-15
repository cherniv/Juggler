import React from 'react';
import {
	View,
  Image,
  StyleSheet,
  PanResponder,
} from 'react-native';
import Device, {width, height} from 'utils/Device';
import px from 'utils/PixelSizeFixer';
import Matter from 'matter-js';
import {
  Body,
} from 'react-game-kit/native';
import BodyComponent from 'objects/proto/BodyComponent'

const HAND_HEIGHT = (20);
const HAND_WIDTH = (40);

const TOP = Device.height / 100 * 75;

export default class Hand extends BodyComponent {

  update = () => {
  	//console.log('this.body', this.body)
  	if (!this.body) return;
  	//console.log('this.body.body.position', this.body.body.position)
  	this.setState({
       ballPosition: this.body.body.position,
       //ballAngle: this.body.body.angle,
     });
  	// if (this.tapTimestampStart) {
  	// 	this.forceIncrease();
  	// }
    // tick logic
  };

	constructor(props) {
		super(props);
		this.isLeft = !this.props.type;
		this.state = {
			currentForce: 0,
      //gravity: 1,
      ballPosition: {
        x: 0,
        y: 0,
      },
      //ballAngle: 45,
    };
	}
	componentWillMount() {
		this.initPanResponder();
  }

  componentWillReceiveProps(props) {
  //	console.log('this.body', this.body.body)
  //	console.log('PROPS', )
    var {collision} = props;
    if (!collision) return;
  	var {pairs} = collision;
  	var ball;
  	if (pairs[0] && pairs[0].bodyB == this.body.body) {
  		ball = pairs[0].bodyA;
  	}
  	if (pairs[0] && pairs[0].bodyA == this.body.body) {
  		ball = pairs[0].bodyB;
  	}
  	
  	if (ball && this.ball != ball) {
  		this.ball = ball;
      this.pushBall();
  	}
  }

  checkIfTapIsOnMySide = (gestureState) => {
  	console.log('gestureState', this.isLeft)
  }
  startForceIncrease = () => {
  	this.tapTimestampStart = new Date();
  }
  
  pushBall() {
    console.log('STIFF', this.constraint)
      
      Matter.Body.setVelocity(this.ball, {x: this.isLeft ? 3 : -3, y: - (5 + Math.random() * 5) });
      this.ball = null;
      // this.constraint = null;
  }
  forceIncrease = () => {
  	var currentForce = this.state.currentForce + 0.2 ;
  	if (currentForce > 20) currentForce = 20;
  	this.setState({currentForce})
  	//console.log('forceIncrease', currentForce)
  }
  initPanResponder = () => {
  	 	this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {

        Matter.Body.setPosition(this.body.body, {
          x: gestureState.x0, // this.startPosition.x + gestureState.dx,
          y: gestureState.y0, // this.startPosition.y + gestureState.dy,
        });
        
        //this.startForceIncrease();
        
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log( this.isLeft, gestureState.moveX)
        var newX;
        if ((this.isLeft && gestureState.moveX > width / 2) || (!this.isLeft && gestureState.moveX < width / 2)) {
          newX = width / 2;
        } else {
          newX = gestureState.moveX;
        }

        Matter.Body.setPosition(this.body.body, {
          x: newX, // this.startPosition.x + gestureState.dx,
          y: gestureState.moveY, // this.startPosition.y + gestureState.dy,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {


         Matter.Body.setPosition(this.body.body, {
          x: this.calculateInitLeft(), // this.startPosition.x + gestureState.dx,
          y: TOP, // this.startPosition.y + gestureState.dy,
        });
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
	getPositionStyles() {
	    return {
	      
	      transform: [
	        { translateX: (!this.isLeft ? -width/2 : 0) + this.state.ballPosition.x - HAND_WIDTH/2 },
	        { translateY: this.state.ballPosition.y - HAND_HEIGHT/2 + (this.state.currentForce/10) },
	        //{ rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
	      ],
	    };
	  }
  calculateInitLeft = () => {
    var left = Device.width / 4;
    if (!this.isLeft) left += Device.width / 2;
    return left;
  }
	render() {
		
		return (

			<View 
				style={{width: width/ 2, height: '100%', position: 'absolute', top: 0, left: this.isLeft ?0 : '50%', /*backgroundColor: this.isLeft ? 'rgba(255,255,255,1)' : '#FF00ff' */}}
				{...this._panResponder.panHandlers}
			>
  			<Body
  				isStatic={true}
  				label={ (this.isLeft ? 'LEFT' : 'RIGHT' ) + '_HAND'}
          shape="rectangle"
          mask="HAND"
          args={[this.calculateInitLeft(), (TOP), HAND_WIDTH, HAND_HEIGHT ]}
          density={0.003}
          friction={0}
          frictionStatic={0}
          restitution={0}
          ref={(b) => { 
            if (!b) return;  
            this.body = b; 
            //console.log('AAA', b)  
          }}
          
        >
         	<View style={[styles.hand, this.getPositionStyles()]}  >
            <Image
              source={require('images/hand.png')}
              style={styles.image}
              resizeMode='contain'
            />
  				</View>
        </Body>
      </View>
		)
	}
}

var styles = StyleSheet.create({
  hand: {
  	position: 'absolute',
  	top: 0,
  	left: 0,
    width: HAND_WIDTH, height: HAND_HEIGHT,
    //  backgroundColor: '#009900',
  },
  image: {
    marginLeft: -10,
    marginTop: -20,
  }
})