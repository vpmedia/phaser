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
     * TBD.
     * @param {WebGLRenderingContext & { id: number }} gl - TBD.
     */
    setContext(gl: WebGLRenderingContext & {
        id: number;
    }): void;
    /**
     * TBD.
     * @param {number[]} attribs - TBD.
     */
    setAttribs(attribs: number[]): void;
    /**
     * TBD.
     * @param {NormalShader} shader - TBD.
     * @returns {boolean} TBD.
     */
    setShader(shader: NormalShader): boolean;
    _currentId: any;
    currentShader: NormalShader;
    /**
     * TBD.
     */
    destroy(): void;
}
import { PrimitiveShader } from './shader/primitive.js';
import { ComplexPrimitiveShader } from './shader/complex.js';
import { NormalShader } from './shader/normal.js';
import { FastShader } from './shader/fast.js';
import { StripShader } from './shader/strip.js';
//# sourceMappingURL=shader_manager.d.ts.map