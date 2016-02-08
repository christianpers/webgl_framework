import BaseCamera from '../cameras/BaseCamera';

export default class FreeCamera extends BaseCamera{

	constructor(){

		super();

		this.linVel = vec3.fromValues(0.0, 0.0, 0.0); // Animation of positions
		this.angVel = vec3.fromValues(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)

	}

	yaw(angle) {

		this.rotateOnAxis(this.up, angle);
	}

	pitch(angle) {

		this.rotateOnAxis(this.left, angle);
	}

	roll(angle){

	  this.rotateOnAxis(this.dir, angle);
	}

	rotateOnAxis(axisVec, angle){

	  // Create a proper Quaternion based on location and angle
	  var quate=quat.create();
	  quat.setAxisAngle(quate, axisVec, angle)
	  
	  // Create a rotation Matrix out of this quaternion
	  vec3.transformQuat(this.dir, this.dir, quate)  
	  vec3.transformQuat(this.left, this.left, quate)  
	  vec3.transformQuat(this.up, this.up, quate)  
	  vec3.normalize(this.up,this.up);
	  vec3.normalize(this.left,this.left);
	  vec3.normalize(this.dir,this.dir);

	  this.up = vec3.fromValues(0.0, 1.0, 0.0); // Camera Up vector
	}

	setAngularVel(newVec){

	  this.angVel[0] = newVec[0];
	  this.angVel[1] = newVec[1];
	  this.angVel[2] = newVec[2];
	}

	getAngularVel(){

	  return vec3.clone(this.angVel);
	}

	getLinearVel(){

	  return vec3.clone(this.linVel);
	}

	setLinearVel(){

	  this.linVel[0] = newVec[0];
	  this.linVel[1] = newVec[1];
	  this.linVel[2] = newVec[2];
	}

	setLookAtPoint(newVec){

		function isVectorEqual(vecone,vectwo)
		{
		   if(vecone[0]==vectwo[0]&&vecone[1]==vectwo[1]&&vecone[2]==vectwo[2])
		   {
		   return true;
		   }
		   else{
		    return false;
		   }
		}

		// if the position hasn't yet been changed and they want the
	  // camera to look at [0,0,0], that will create a problem.
	  if (isVectorEqual(this.pos, [0, 0, 0]) && isVectorEqual(newVec, [0, 0, 0]))
	  {
	  
	  }
	  else
	  {
		// Figure out the direction of the point we are looking at.
		vec3.subtract(this.dir,newVec, this.pos);
		vec3.normalize(this.dir,this.dir);
		// Adjust the Up and Left vectors accordingly
		vec3.cross(this.left,vec3.fromValues(0, 1, 0), this.dir );
		vec3.normalize(this.left,this.left);
		vec3.cross(this.up,this.dir, this.left);
		vec3.normalize(this.up,this.up);
	  }
	}

	setPosition(newVec){

	  this.pos=vec3.fromValues(newVec[0],newVec[1],newVec[2]);

	}

	setUpVector(newVec){

	  this.up[0] = newVec[0];
	  this.up[1] = newVec[1];
	  this.up[2] = newVec[2];
	}

	// moveSide(s){

	//   var newPosition = [this.pos[0] - s*this.left[0],this.pos[1] - s*this.left[1],this.pos[2] - s*this.left[2]];

	//   this.setPosition(newPosition);
	// };


	moveForward(s){

	  var dirTemp = this.dir.slice(0);
	  dirTemp[1] = 0;

	  var newPosition = [this.pos[0] - s*this.dir[0],this.pos[1] - s*this.dir[1],this.pos[2] - s*this.dir[2]];

	  this.setPosition(newPosition);
	}

	update(timeStep){

	  if (vec3.squaredLength(this.linVel)==0 && vec3.squaredLength(this.angularVel)==0) 
	  return false;

	  if (vec3.squaredLength(this.linVel) > 0.0)
	  {
		// Add a velocity to the position
		vec3.scale(this.velVec,this.velVec, timeStep);

		vec3.add(this.pos, this.velVec, this.pos);
	  }

	  if (vec3.squaredLength(this.angVel) > 0.0)
	  {
		// Apply some rotations to the orientation from the angular velocity
		this.pitch(this.angVel[0] * timeStep);
		this.yaw(this.angVel[1] * timeStep);
		this.roll(this.angVel[2] * timeStep);
	  }

	  return true;
	}
}