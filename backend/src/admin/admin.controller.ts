import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/coupon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('coupons')
  @ApiOperation({ summary: 'Create a new coupon' })
  async createCoupon(@Body() dto: CreateCouponDto) {
    return this.adminService.createCoupon(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (including sold)' })
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProductById(@Param('id') id: string) {
    return this.adminService.getProductById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
    return this.adminService.updateCoupon(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  async deleteProduct(@Param('id') id: string) {
    return this.adminService.deleteProduct(id);
  }
}
