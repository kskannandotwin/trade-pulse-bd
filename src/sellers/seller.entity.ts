import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactInfo: string;

  @ManyToOne(() => Seller, seller => seller.subSellers, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_seller_id' })
  parentSeller: Seller;

  @OneToMany(() => Seller, seller => seller.parentSeller)
  subSellers: Seller[];
}
