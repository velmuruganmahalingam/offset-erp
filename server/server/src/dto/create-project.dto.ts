export class CreateProjectDto {
  ofNo!: string;

  orderDate?: Date;

  proofDate?: Date;

  deliveryDate?: Date;

  jobType!: string;

  processType!: string;

  customerName!: string;

  mobile?: string;

  place?: string;

  orderTakenBy?: string;

  size?: string;

  gsm?: string;

  numberOfCopies?: number;

  layout?: string;

  designBy?: string;

  rawMaterialByParty?: boolean;

  openStyle?: string;

  numberOfColours?: number;

  extraColour?: string;

  specialEffects?: string[];

  lamination?: string;

  laminationFinish?: string;

  creasing?: boolean;

  pasting?: boolean;

  designDetails?: string;

  numberOfPapers?: number;

  numberOfPages?: number;

  numberOfPlates?: number;

  numberOfDrawings?: number;

  numberOfPositive?: number;

  numberOfCD?: number;

  coverDetails?: any;

  paymentDetails?: any;

  workflow?: any;
}