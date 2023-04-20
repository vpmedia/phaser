export class WebGLShaderManager {
    gl: any;
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
     * @param gl - TBD.
     */
    setContext(gl: any): void;
    /**
     * TBD.
     * @param attribs
     */
    setAttribs(attribs: any): void;
    /**
     * TBD.
     * @param shader
     */
    setShader(shader: any): boolean;
    _currentId: any;
    currentShader: any;
    /**
     * TBD.
     */
    destroy(): void;
}
import { PrimitiveShader } from './shader/primitive';
import { ComplexPrimitiveShader } from './shader/complex';
import { NormalShader } from './shader/normal';
import { FastShader } from './shader/fast';
import { StripShader } from './shader/strip';
//# sourceMappingURL=shader_manager.d.ts.map