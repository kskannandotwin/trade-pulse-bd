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
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Post()
  create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customersService.create(customerData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customersService.update(id, customerData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(id);
  }
}
