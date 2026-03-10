import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  findAll(): Promise<Sale[]> {
    return this.salesRepository.find({ order: { saleDate: 'DESC' } });
  }

  findOne(id: string): Promise<Sale | null> {
    return this.salesRepository.findOneBy({ id });
  }

  async create(saleData: Partial<Sale>): Promise<Sale> {
    const quantity = Number(saleData.quantity) || 0;
    const unitPrice = Number(saleData.unitPrice) || 0;
    const sale = this.salesRepository.create({
      ...saleData,
      quantity,
      unitPrice,
      totalAmount: quantity * unitPrice,
    });
    return this.salesRepository.save(sale);
  }

  async update(id: string, saleData: Partial<Sale>): Promise<Sale> {
    const sale = await this.findOne(id);
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    Object.assign(sale, saleData);
    const quantity = Number(sale.quantity);
    const unitPrice = Number(sale.unitPrice);
    sale.totalAmount = quantity * unitPrice;
    return this.salesRepository.save(sale);
  }

  async remove(id: string): Promise<void> {
    const result = await this.salesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
  }
}
