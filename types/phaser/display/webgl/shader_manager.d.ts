export class WebGLShaderManager {
    gl: WebGLRenderingContext & {
        id: number;
    };
    primitiveShader: PrimitiveShader;
    complexPrimitiveShader: ComplexPrimitiveShader;
    defaultShader: NormalShader;
    fastShader: FastShader;
    stripShader: StripShader;
    maxAttibs: number;
    attribState: boolean[];
    tempAttribState: any[];
    stack: any[];
    /**
     * Initializes the shader manager with a WebGL context.
     * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
    /**
     * Sets up the shader manager for WebGL rendering.
     * @param {number[]} attribs - The attribute locations to set up.
     */
    setAttribs(attribs: number[]): void;
    /**
     * Sets up the shader manager for WebGL rendering.
     * @param {NormalShader} shader - The shader to set up.
     * @returns {boolean} Whether the shader setup was successful.
     */
    setShader(shader: NormalShader): boolean;
    _currentId: any;
    currentShader: NormalShader;
    /**
     * Destroys the manager.
     */
    destroy(): void;
}
import { PrimitiveShader } from './shader/primitive.js';
import { ComplexPrimitiveShader } from './shader/complex.js';
import { NormalShader } from './shader/normal.js';
import { FastShader } from './shader/fast.js';
import { StripShader } from './shader/strip.js';
//# sourceMappingURL=shader_manager.d.ts.map