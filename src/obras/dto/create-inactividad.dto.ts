import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateInactividadDTO{


    @IsString()
    nombre: string

    @IsString()
    fecha: string;

    @IsString()
    fileName: string;
    
    @IsString()
    usuarioId: string;

    @IsBoolean()
    @IsOptional()
    privado?: boolean = false
} 