import { hex2rgb } from '../../util/math.js';

export class WebGLStencilManager {
  /**
   * TBD.
   */
  constructor() {
    this.stencilStack = [];
    this.reverse = true;
    this.count = 0;
  }

  /**
   * TBD.
   * @param {WebGLRenderingContext} gl - TBD.
   */
  setContext(gl) {
    this.gl = gl;
  }

  /**
   * TBD.
   */
  destroy() {
    this.stencilStack = null;
    this.gl = null;
  }

  /**
   * TBD.
   * @param {import('../graphics.js').Graphics} graphics - TBD.
   * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
   * @param {object} renderSession - TBD.
   */
  pushStencil(graphics, webGLData, renderSession) {
    const gl = renderSession.gl;
    this.bindGraphics(graphics, webGLData, renderSession);
    if (this.stencilStack.length === 0) {
      gl.enable(gl.STENCIL_TEST);
      gl.clear(gl.STENCIL_BUFFER_BIT);
      this.reverse = true;
      this.count = 0;
    }
    this.stencilStack.push(webGLData);
    const level = this.count;
    gl.colorMask(false, false, false, false);
    gl.stencilFunc(gl.ALWAYS, 0, 0xff);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INVERT);
    // draw the triangle strip!
    if (webGLData.mode === 1) {
      gl.drawElements(gl.TRIANGLE_FAN, webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0);
      if (this.reverse) {
        gl.stencilFunc(gl.EQUAL, 0xff - level, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
      } else {
        gl.stencilFunc(gl.EQUAL, level, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
      }
      // draw a quad to increment..
      gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
      if (this.reverse) {
        gl.stencilFunc(gl.EQUAL, 0xff - (level + 1), 0xff);
      } else {
        gl.stencilFunc(gl.EQUAL, level + 1, 0xff);
      }
      this.reverse = !this.reverse;
    } else {
      if (!this.reverse) {
        gl.stencilFunc(gl.EQUAL, 0xff - level, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
      } else {
        gl.stencilFunc(gl.EQUAL, level, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
      }
      gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
      if (!this.reverse) {
        gl.stencilFunc(gl.EQUAL, 0xff - (level + 1), 0xff);
      } else {
        gl.stencilFunc(gl.EQUAL, level + 1, 0xff);
      }
    }
    gl.colorMask(true, true, true, true);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    this.count += 1;
  }

  /**
   * TBD.
   * @param {import('../graphics.js').Graphics} graphics - TBD.
   * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
   * @param {object} renderSession - TBD.
   */
  bindGraphics(graphics, webGLData, renderSession) {
    // if(this._currentGraphics === graphics)return;
    // this._currentGraphics = graphics;
    const gl = renderSession.gl;
    // bind the graphics object..
    const projection = renderSession.projection;
    const offset = renderSession.offset;
    let shader; // = renderSession.shaderManager.primitiveShader;
    if (webGLData.mode === 1) {
      shader = renderSession.shaderManager.complexPrimitiveShader;
      renderSession.shaderManager.setShader(shader);
      gl.uniform1f(shader.flipY, renderSession.flipY);
      gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
      gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
      gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
      gl.uniform3fv(shader.tintColor, hex2rgb(graphics.tint));
      gl.uniform3fv(shader.color, webGLData.color);
      gl.uniform1f(shader.alpha, graphics.worldAlpha * webGLData.alpha);
      gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
      gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 2, 0);
      // now do the rest..
      // set the index buffer!
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
    } else {
      // renderSession.shaderManager.activatePrimitiveShader();
      shader = renderSession.shaderManager.primitiveShader;
      renderSession.shaderManager.setShader(shader);
      gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
      gl.uniform1f(shader.flipY, renderSession.flipY);
      gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
      gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
      gl.uniform3fv(shader.tintColor, hex2rgb(graphics.tint));
      gl.uniform1f(shader.alpha, graphics.worldAlpha);
      gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
      gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
      gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
      // set the index buffer!
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
    }
  }

  /**
   * TBD.
   * @param {import('../graphics.js').Graphics} graphics - TBD.
   * @param {import('./graphics_data.js').GraphicsData} webGLData - TBD.
   * @param {object} renderSession - TBD.
   */
  popStencil(graphics, webGLData, renderSession) {
    const gl = renderSession.gl;
    this.stencilStack.pop();
    this.count -= 1;
    if (this.stencilStack.length === 0) {
      // the stack is empty!
      gl.disable(gl.STENCIL_TEST);
    } else {
      const level = this.count;
      this.bindGraphics(graphics, webGLData, renderSession);
      gl.colorMask(false, false, false, false);
      if (webGLData.mode === 1) {
        this.reverse = !this.reverse;
        if (this.reverse) {
          gl.stencilFunc(gl.EQUAL, 0xff - (level + 1), 0xff);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
        } else {
          gl.stencilFunc(gl.EQUAL, level + 1, 0xff);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
        }
        // draw a quad to increment..
        gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
        gl.stencilFunc(gl.ALWAYS, 0, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INVERT);
        // draw the triangle strip!
        gl.drawElements(gl.TRIANGLE_FAN, webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0);
        if (!this.reverse) {
          gl.stencilFunc(gl.EQUAL, 0xff - level, 0xff);
        } else {
          gl.stencilFunc(gl.EQUAL, level, 0xff);
        }
      } else {
        if (!this.reverse) {
          gl.stencilFunc(gl.EQUAL, 0xff - (level + 1), 0xff);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
        } else {
          gl.stencilFunc(gl.EQUAL, level + 1, 0xff);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
        }
        gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
        if (!this.reverse) {
          gl.stencilFunc(gl.EQUAL, 0xff - level, 0xff);
        } else {
          gl.stencilFunc(gl.EQUAL, level, 0xff);
        }
      }
      gl.colorMask(true, true, true, true);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    }
  }
}
