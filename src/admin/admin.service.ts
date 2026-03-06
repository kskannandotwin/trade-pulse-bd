import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async onModuleInit() {
    // Seed default admin if missing
    const count = await this.adminRepository.count();
    if (count === 0) {
      const password_hash = await bcrypt.hash('admin123', 10);
      const admin = this.adminRepository.create({
        username: 'admin',
        password_hash,
      });
      await this.adminRepository.save(admin);
      console.log('Seeded default admin user: admin / admin123');
    }
  }

  async findOne(username: string): Promise<Admin | undefined> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    return admin || undefined;
  }
}
