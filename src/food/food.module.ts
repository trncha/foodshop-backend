import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './entities/food.entity';

@Module({
	imports: [TypeOrmModule.forFeature([FoodEntity])],
	controllers: [FoodController],
	providers: [FoodService],
})
export class FoodModule { }
