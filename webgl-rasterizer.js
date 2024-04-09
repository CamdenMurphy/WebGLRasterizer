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
}

main();

