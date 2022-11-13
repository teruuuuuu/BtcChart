import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Price } from './price.entity';
import { PriceService } from './price.service';

const typeModule = TypeOrmModule.forFeature([Price]);

@Module({
    imports: [typeModule],
    exports: [typeModule, PriceService],
    providers: [PriceService],
    controllers: [],
})
export class PriceModule {}

