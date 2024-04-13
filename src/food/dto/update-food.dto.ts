import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ECategoryFood } from '../interfaces/food.interface';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {

	@IsOptional()
	@ApiPropertyOptional({ default: '' })
	name?: string;

	@IsOptional()
	@ApiPropertyOptional({ default: '' })
	price?: number;

	@IsOptional()
	@ApiPropertyOptional({ default: '' })
	description?: string;

	@IsOptional()
	@IsEnum(ECategoryFood)
    @ApiPropertyOptional({ enum: ECategoryFood, default: ECategoryFood.Salad })
	category?: string;
	
	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	image?: any;
}
