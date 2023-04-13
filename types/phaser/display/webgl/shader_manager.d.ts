export default class _default {
    gl: any;
    primitiveShader: PrimitiveShader | null;
    complexPrimitiveShader: ComplexPrimitiveShader | null;
    defaultShader: NormalShader | null;
    fastShader: FastShader | null;
    stripShader: StripShader | null;
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
import PrimitiveShader from './shader/primitive';
import ComplexPrimitiveShader from './shader/complex';
import NormalShader from './shader/normal';
import FastShader from './shader/fast';
import StripShader from './shader/strip';
//# sourceMappingURL=shader_manager.d.ts.map