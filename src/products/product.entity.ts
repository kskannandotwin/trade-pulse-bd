import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductCategory {
  CARE = 'Care',
  FOOD = 'Food',
  OTHER = 'Other',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.OTHER,
  })
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;
}
