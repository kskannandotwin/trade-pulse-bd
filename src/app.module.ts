import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/admin.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/sale.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/customer.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { RawMaterial } from './raw-materials/raw-material.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_NAME'),
        entities: [Admin, Product, Sale, Customer, Order, RawMaterial],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    AuthModule,
    ProductsModule,
    SalesModule,
    CustomersModule,
    OrdersModule,
    RawMaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
