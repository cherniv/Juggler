import Matter from 'matter-js';
import dimensions, {width, height} from 'utils/Device'

module.exports = {
	init: (engine) => {
		console.log('dimensions', dimensions.height)
	    const ground = Matter.Bodies.rectangle(
	      dimensions.width / 2, dimensions.height,
	      dimensions.width, 10,
	      {
	        isStatic: true,
	      },
	    );
	    ground.label = "GROUND";
	    //ground.restitution = 1;
	    const ceiling = Matter.Bodies.rectangle(
	      dimensions.width / 2, -dimensions.height,
	      dimensions.width, 10,
	      {
	        isStatic: true,
	      },
	    );

	    const leftWall = Matter.Bodies.rectangle(
	      0, 0,
	      10, dimensions.height * 2,
	      {
	        isStatic: true,
	      },
	    );
	     leftWall.label = "LEFT_WALL";

	    const rightWall = Matter.Bodies.rectangle(
	      dimensions.width, 0,
	       10, dimensions.height * 2,
	      {
	        isStatic: true,
	      },
	    );


	   	Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

	    engine.world.bounds = {max: {x: width, y: height}, min: {x: -10, y: -height}}
	}

}
