import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './seller.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('sellers')
@UseGuards(AuthGuard('jwt'))
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  async findAll(): Promise<Seller[]> {
    return this.sellersService.findAll();
  }

  @Post()
  async create(@Body() sellerData: Partial<Seller>): Promise<Seller> {
    return this.sellersService.create(sellerData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() sellerData: Partial<Seller>,
  ): Promise<Seller> {
    return this.sellersService.update(id, sellerData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sellersService.remove(id);
  }
}
