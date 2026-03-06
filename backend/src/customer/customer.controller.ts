import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomerService } from './customer.service';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get all available products for customers' })
  async getProducts() {
    return this.customerService.getAvailableProducts();
  }

  @Post('products/:id/purchase')
  @ApiOperation({ summary: 'Purchase a product at minimum price' })
  async purchaseProduct(@Param('id') id: string) {
    return this.customerService.purchaseProduct(id);
  }
}
