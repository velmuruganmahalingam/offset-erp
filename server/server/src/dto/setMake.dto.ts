import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SetMakeDTO{
    @IsString()
    @IsOptional()
    setmaker!:string

    @IsString()
    @IsNotEmpty()
    customerName!:string

    @IsString()
    @IsNotEmpty()
    status!:string

    @IsString()
    @IsNotEmpty()
    processType!:string

    @IsDateString()
    @IsNotEmpty()
    assignedDate!:string

    @IsDateString()
    @IsNotEmpty()
    deadline!:string
}