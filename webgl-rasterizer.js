// Based on this tutorial: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL

function main() {
    // Assign the canvas by its ID
    const canvas = document.getElementById("webglCanvas");
    // Try to get the WebGL rendering context from the canvas
    const gl = canvas.getContext("webgl");

    // Check that we got WebGLRenderingContext successfully
    if (!gl) {
        alert("Failed to initialize WebGL.");
        return;
    }

    // Set the clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer to apply the clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
            gl_Position = uProjectionMatrix * 
            uModelViewMatrix * aVertexPosition;
        }
    `;

    // Fragment shader
    const fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

}

// Initializes the shader program
function initializeShaders(gl, vsSource, fsSource) {
    // Create shader program
    const shaderProgram = gl.createProgram();

    // Create shaders
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    // Attatch shaders' code to memory on GPU and link them together
    gl.attatchShader(shaderProgram, vertexShader);
    gl.attatchShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Throw error if shader program fails to create
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(shaderProgram);
    }

    return shaderProgram;
}

// Creates a shader, given a type, and compiles it
function loadShader(gl, type, source) {
    // Create a new shader
    const shader = gl.createShader(type);

    // Send the shader's source code to the shader
    gl.shaderSource(shader, source);

    // Compile
    gl.compileShader(shader);

    // Error checking
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`Error compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

main();

