import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './entities/food.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { ErrorException } from '../exceptions/error.exception';
import { configUploadAttach } from '../shared/uploadAttachment/config';
const fs = require('fs');

@Injectable()
export class FoodService {
	constructor(
		@InjectRepository(FoodEntity)
		private foodRepository: Repository<FoodEntity>,
	) { }

	async create(createFoodDto: CreateFoodDto, image: Express.Multer.File) {
		console.log('image', image);
		
		try {
			const itemFood: FoodEntity = {
				...createFoodDto,
				id: uuidv4(),
				image: `image/${image.filename}`,
				createDate: new Date(),
				updateDate: new Date()
			};
			const responseData = await this.foodRepository.save(itemFood);
			return { responseData }
		} catch (error) {
			throw new ErrorException(error)
		}
	}

	async findAll() {

		const foods = await this.foodRepository.find({ order: { updateDate: 'DESC' } });
		const total = await this.foodRepository.count();
		const responseData = foods.map((item) => {
			return {
				...item,
				image: `${configUploadAttach.urlImg}/${item.image}`
			}
		})

		return { total, responseData };
	}

	async findOne(id: string) {

		const food = await this.foodRepository.findOne({ where: { id } });
		if (!food) throw new NotFoundException(`Entity with foodId ${id} not found`);

		const responseData = { ...food, image: `${configUploadAttach.urlImg}/${food.image}` }

		return { responseData };
	}

	async update(id: string, updateFoodDto: UpdateFoodDto, image: Express.Multer.File) {

		try {
			const food = await this.foodRepository.findOne({ where: { id } });
			if (!food) throw new NotFoundException(`Entity with foodId ${id} not found`);

			const oldImagePath = image && food.image ? `${configUploadAttach.rootDir}/${food.image}` : null;

			food.updateDate = new Date();
			food.image = image ? `image/${image.filename}` : food.image;
			Object.assign(food, updateFoodDto);

			const responseData = await this.foodRepository.save(food);

			if (oldImagePath && fs.existsSync(oldImagePath)) {
				fs.unlinkSync(oldImagePath);
			}

			return { responseData }
		} catch (error) {
			throw new ErrorException(error);
		}
	}

	async remove(id: string) {

		const food = await this.foodRepository.findOne({ where: { id } });
		if (!food) throw new NotFoundException(`Entity with foodId ${id} not found`);

		const pathImage = food.image ? `${configUploadAttach.rootDir}/${food.image}`: null;
		if (pathImage && fs.existsSync(pathImage)) {
			fs.unlinkSync(pathImage);
		}

		await this.foodRepository.remove(food);
	}
}
