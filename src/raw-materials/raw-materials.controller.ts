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
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterial } from './raw-material.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Get('products/:productId/raw-materials')
  async findAll(@Param('productId') productId: string): Promise<RawMaterial[]> {
    return this.rawMaterialsService.findAllByProduct(productId);
  }

  @Post('products/:productId/raw-materials')
  async create(
    @Param('productId') productId: string,
    @Body() rawMaterialData: Partial<RawMaterial>,
  ): Promise<RawMaterial> {
    return this.rawMaterialsService.create(productId, rawMaterialData);
  }

  @Put('raw-materials/:id')
  async update(
    @Param('id') id: string,
    @Body() rawMaterialData: Partial<RawMaterial>,
  ): Promise<RawMaterial> {
    return this.rawMaterialsService.update(id, rawMaterialData);
  }

  @Delete('raw-materials/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rawMaterialsService.remove(id);
  }
}
