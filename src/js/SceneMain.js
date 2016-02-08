import Scene from "./framework/Scene";
import ViewPlain from "./views/ViewPlain";
import MouseInteractor from "./framework/MouseInteractor";
import KeyboardInteractor from "./framework/KeyboardInteractor";
import SceneTransforms from "./framework/SceneTransforms";

export default class SceneMain extends Scene {
	constructor() {

		super();
		this.onResize();
		window.addEventListener('resize', () => {
			this.onResize();
		});

		// debugger;
		this.camera.setPosition(new Array(0.0, 0.0, 0.0));
   		this.camera.setLookAtPoint(vec3.fromValues(0.0, 0.0, 1.0));

		this.mouseInteractor = new MouseInteractor(this.camera, this.canvas);
	    this.mouseInteractor.setup();

	    this.keyboardInteractor = new KeyboardInteractor(this.camera, this.canvas);
	    this.keyboardInteractor.setup();

		this.transforms = new SceneTransforms(this.canvas);
		
		this.initViews();


	}

	initTextures() {


	}

	initViews() {

		this.vPlain = new ViewPlain(this.transforms);

	}

	update() {

		super.update();

	}

	render() {

		this.gl.enable(this.gl.DEPTH_TEST);

		this.gl.disable(this.gl.BLEND);

		this.gl.clearColor( 0, 0, 0, 1 );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

		this.transforms.push();
		this.transforms.setCamera(this.camera);

		this.camera.apply(this.gl.viewportWidth / this.gl.viewportHeight);
	    this.transforms.calculateModelView();
		this.vPlain.render();

		this.transforms.pop();

	}


}