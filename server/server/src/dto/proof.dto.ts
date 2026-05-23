import { IsNotEmpty, IsString, IsDateString } from "class-validator";

export class ProofUpdateDto{
    @IsString()
    @IsNotEmpty()
    designedBy!:string

    @IsString()
    @IsNotEmpty()
    checkedBy!:string
    
    @IsDateString()
    assignedDate!:string

    @IsDateString()
    deadline!:string
}

export class FinalApproveDto {

  @IsString()
  @IsNotEmpty()
  approvedBy!: string;

  @IsDateString()
  assignedDate!: string;

  @IsDateString()
  deadline!: string;
}