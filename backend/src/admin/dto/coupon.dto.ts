import { IsString, IsNotEmpty, IsNumber, IsEnum, Min, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CouponValueType } from '@prisma/client';
import { IsImageUrl } from '../../common/validators/image-url.validator';

export class CreateCouponDto {
  @ApiProperty({ example: 'Amazon $100 Gift Card' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Redeemable on Amazon.com' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg or data:image/jpeg;base64,...' })
  @IsImageUrl({ message: 'imageUrl must be a valid URL or Data URI' })
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: 80, description: 'Cost price (internal)' })
  @IsNumber()
  @Min(0)
  costPrice: number;

  @ApiProperty({ example: 25, description: 'Margin percentage (internal)' })
  @IsNumber()
  @Min(0)
  marginPercentage: number;

  @ApiProperty({ enum: CouponValueType, example: CouponValueType.STRING })
  @IsEnum(CouponValueType)
  valueType: CouponValueType;

  @ApiProperty({ example: 'ABCD-1234-5678-EFGH' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class UpdateCouponDto {
  @ApiProperty({ example: 'Amazon $100 Gift Card', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Redeemable on Amazon.com', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 80, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  costPrice?: number;

  @ApiProperty({ example: 25, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  marginPercentage?: number;

  @ApiProperty({ enum: CouponValueType, required: false })
  @IsEnum(CouponValueType)
  @IsOptional()
  valueType?: CouponValueType;

  @ApiProperty({ example: 'ABCD-1234-5678-EFGH', required: false })
  @IsString()
  @IsOptional()
  value?: string;
}
