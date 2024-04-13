import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateFoodSwagger, DeleteFoodSwagger, FindAllFoodSwagger, FindOneFoodSwagger, UpdateFoodSwagger } from './food.swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'src/shared/uploadAttachment/uploadAttachment.service';
import { Express } from 'express';

@ApiTags('Food Service')
@Controller('food')
export class FoodController {
	constructor(private readonly foodService: FoodService) { }

	@Post()
	@CreateFoodSwagger()
	@UseInterceptors(FileInterceptor('image', { storage: diskStorage }))
	create(@Body() createFoodDto: CreateFoodDto, @UploadedFile() image: Express.Multer.File) {
		console.log('createFoodDto', createFoodDto);
		
		return this.foodService.create(createFoodDto, image);
	}

	@Get()
	@FindAllFoodSwagger()
	findAll() {
		return this.foodService.findAll();
	}

	@Get(':id')
	@FindOneFoodSwagger()
	findOne(@Param('id') id: string) {
		return this.foodService.findOne(id);
	}

	@Patch(':id')
	@UpdateFoodSwagger()
	@UseInterceptors(FileInterceptor('image', { storage: diskStorage }))
	update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto, @UploadedFile() image: Express.Multer.File) {
		return this.foodService.update(id, updateFoodDto, image);
	}

	@Delete(':id')
	@DeleteFoodSwagger()
	remove(@Param('id') id: string) {
		return this.foodService.remove(id);
	}
}
