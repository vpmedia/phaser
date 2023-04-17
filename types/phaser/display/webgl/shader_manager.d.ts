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
    setContext(gl: any): void;
    setAttribs(attribs: any): void;
    setShader(shader: any): boolean;
    _currentId: any;
    currentShader: any;
    destroy(): void;
}
import { PrimitiveShader } from './shader/primitive';
import { ComplexPrimitiveShader } from './shader/complex';
import { NormalShader } from './shader/normal';
import { FastShader } from './shader/fast';
import { StripShader } from './shader/strip';
//# sourceMappingURL=shader_manager.d.ts.map