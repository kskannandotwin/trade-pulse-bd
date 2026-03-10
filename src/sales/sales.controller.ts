import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Post()
  create(@Body() saleData: Partial<Sale>): Promise<Sale> {
    return this.salesService.create(saleData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() saleData: Partial<Sale>,
  ): Promise<Sale> {
    return this.salesService.update(id, saleData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.salesService.remove(id);
  }
}
