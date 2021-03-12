import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  // Req,
  // Res,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Redirect('https://google.com', 301)
  // getAll(@Req() req: Request, @Res() res: Response) {

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}
