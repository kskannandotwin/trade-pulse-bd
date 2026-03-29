import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async findAll(): Promise<Seller[]> {
    return this.sellersRepository.find({
      relations: ['parentSeller', 'subSellers'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellersRepository.findOne({
      where: { id },
      relations: ['parentSeller', 'subSellers'],
    });
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async create(sellerData: Partial<Seller>): Promise<Seller> {
    if (sellerData.parentSeller && sellerData.parentSeller.id === undefined) {
      sellerData.parentSeller = null as any;
    }
    const seller = this.sellersRepository.create(sellerData);
    return this.sellersRepository.save(seller);
  }

  async update(id: string, sellerData: Partial<Seller>): Promise<Seller> {
    // Prevent setting self as parent
    if (sellerData.parentSeller && sellerData.parentSeller.id === id) {
      throw new BadRequestException('A seller cannot be its own parent.');
    }
    
    // Clear parent if an empty id or no id is passed
    if (!sellerData.parentSeller || !sellerData.parentSeller.id) {
      sellerData.parentSeller = null as any;
    }

    await this.sellersRepository.update(id, sellerData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sellersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
  }
}
