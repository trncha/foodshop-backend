import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ECategoryFood } from "../interfaces/food.interface";

export class CreateFoodDto {

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '' })
	name: string;

	@IsNotEmpty()
	@IsNumberString()
	@ApiProperty({ default: '' })
	price: number;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '' })
	description: string;

	@IsNotEmpty()
	@IsEnum(ECategoryFood)
    @ApiProperty({ enum: ECategoryFood, default: ECategoryFood.Salad })
	category: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	image: any;
}