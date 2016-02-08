import View from "../framework/View";
import Mesh from "../framework/Mesh";

export default class ViewPlain extends View {

	constructor(transforms) {

		super(transforms, require("../../shaders/plain.vert"), require("../../shaders/plain.frag"));

		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];

		var size = 1;
		positions.push([-size, -size, 1]);
		positions.push([ size, -size, 1]);
		positions.push([ size,  size, 1]);
		positions.push([-size,  size, 1]);

		// coords.push([0, 0]);
		// coords.push([1, 0]);
		// coords.push([1, 1]);
		// coords.push([0, 1]);

		// debugger;
		this.mesh = new Mesh(4, 6, this.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		// this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	}

	render() {

		this.transforms.push();

		this.shader.bind();
		// this.shader.uniform("uSampler0", "uniform1i", 0);

		// this.shader.uniform("fboW", "uniform1f", fboSize.w);
		// this.shader.uniform("fboH", "uniform1f", fboSize.h);

		// this.shader.uniform("winW", "uniform1f", window.innerWidth);
		// this.shader.uniform("winH", "uniform1f", window.innerHeight);
		 // this.shader.uniform("textureParticle", "uniform1i", 1);
		// texturePos.bind(this.shader, 0);
		// texture.bind(this.shader, 0);
		this.draw(this.mesh);

		this.transforms.pop();
	}
}
