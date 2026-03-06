import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseRequestDto {
  @ApiProperty({ example: 120.00, description: 'Reseller selling price (must be >= minimum_sell_price)' })
  @IsNumber()
  @Min(0)
  resellerPrice: number;
}

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  price: number;
}

export class PurchaseResponseDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  final_price: number;

  @ApiProperty()
  value_type: string;

  @ApiProperty()
  value: string;
}
