import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, Raw } from 'typeorm';

import { Price } from './price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  findAll(): Promise<Price[]> {
    return this.priceRepository.find();
  }

  findOne(id: number): Promise<Price> {
    return this.priceRepository.findOneBy({ id });
  }

  between(from: Date, to: Date): Promise<Price[]> {
    return this.priceRepository.findBy({
        date: Raw((alias) => `${alias} >= :from and ${alias} <= :to`, { from, to}),
    });
  }

  insert(price: Price) {
    return this.priceRepository.insert(price);
  }

  async remove(id: string): Promise<void> {
    await this.priceRepository.delete(id);
  }
}