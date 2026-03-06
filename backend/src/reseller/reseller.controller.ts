import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ResellerService } from './reseller.service';
import { PurchaseRequestDto, ProductResponseDto, PurchaseResponseDto } from './dto/reseller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Reseller API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/products')
export class ResellerController {
  constructor(private readonly resellerService: ResellerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available products' })
  @ApiResponse({ status: 200, description: 'List of available products', type: [ProductResponseDto] })
  async getProducts(): Promise<ProductResponseDto[]> {
    return this.resellerService.getAvailableProducts();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product details', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('productId') productId: string): Promise<ProductResponseDto> {
    return this.resellerService.getProductById(productId);
  }

  @Post(':productId/purchase')
  @ApiOperation({ summary: 'Purchase a product' })
  @ApiResponse({ status: 200, description: 'Purchase successful', type: PurchaseResponseDto })
  @ApiResponse({ status: 400, description: 'Reseller price too low' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product already sold' })
  async purchaseProduct(
    @Param('productId') productId: string,
    @Body() dto: PurchaseRequestDto,
  ): Promise<PurchaseResponseDto> {
    return this.resellerService.purchaseProduct(productId, dto.resellerPrice);
  }
}
