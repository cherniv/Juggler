import Matter from 'matter-js';
import Device from 'utils/Device'

module.exports = {
	init: (engine) => {

	    const dimensions = Device;

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

}
