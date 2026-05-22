import { IsDateString, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class AssignSystemDto {
    @IsString()
    @IsNotEmpty()
    assignedSystem!: string;

    @IsString()
    @IsNotEmpty()
    assignedTo!: string;

    @IsDateString()
    assignedDate!: string;

    @IsDateString()
    deadLine!: string;
}

export class NextStageDto {
    @IsOptional()
    @IsString()
    notes?: string;
}