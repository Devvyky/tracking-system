import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { HistoryStatus } from '../entities/packages.entity';

export class ReceiverDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}

export class SenderDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}
export class HistoryDTO {
  @IsString()
  status: HistoryStatus;

  @IsString()
  description: string;
}
export class CreatePackageDTO {
  @ValidateNested()
  @Type(() => SenderDTO)
  sender: SenderDTO;

  @ValidateNested()
  @Type(() => ReceiverDTO)
  receiver: ReceiverDTO;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  history?: HistoryDTO;
}

export class UpdatePackageDTO extends PartialType(CreatePackageDTO) {}

// export class UpdatePackageDTO extends PartialType(
//   OmitType(CreatePackageDTO, ['history'] as const),
// ) {}
