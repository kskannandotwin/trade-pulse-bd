import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from './raw-material.entity';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialsRepository: Repository<RawMaterial>,
  ) {}

  async findAllByProduct(productId: string): Promise<RawMaterial[]> {
    return this.rawMaterialsRepository.find({
      where: { product: { id: productId } },
      order: { name: 'ASC' },
    });
  }

  async create(productId: string, rawMaterialData: Partial<RawMaterial>): Promise<RawMaterial> {
    const rawMaterial = this.rawMaterialsRepository.create({
      ...rawMaterialData,
      product: { id: productId },
    });
    return this.rawMaterialsRepository.save(rawMaterial);
  }

  async update(id: string, rawMaterialData: Partial<RawMaterial>): Promise<RawMaterial> {
    await this.rawMaterialsRepository.update(id, rawMaterialData);
    const updated = await this.rawMaterialsRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.rawMaterialsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
  }
}
