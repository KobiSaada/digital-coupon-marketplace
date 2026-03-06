import { Module } from '@nestjs/common';
import { ResellerController } from './reseller.controller';
import { ResellerService } from './reseller.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResellerController],
  providers: [ResellerService],
})
export class ResellerModule {}
