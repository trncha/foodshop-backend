import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodService } from './food.service';
import { FoodEntity } from './entities/food.entity';
import { NotFoundException } from '@nestjs/common';

describe('FoodService', () => {
	let service: FoodService;
	let mockRepository: Partial<Record<keyof Repository<FoodEntity>, jest.Mock>>;

	beforeEach(async () => {
		mockRepository = {
			save: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			count: jest.fn(),
			remove: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FoodService,
				{
					provide: getRepositoryToken(FoodEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<FoodService>(FoodService);
	});

	describe('findAll', () => {
		it('should return all foods', async () => {
			const expectedFoods = [{ id: '1', name: 'Pizza', image: 'image/pizza.jpg' }];
			mockRepository.find.mockReturnValue(Promise.resolve(expectedFoods));
			mockRepository.count.mockReturnValue(Promise.resolve(1));

			const result = await service.findAll();
			expect(result.responseData.length).toEqual(1);
			expect(result.total).toEqual(1);
			expect(mockRepository.find).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should throw NotFoundException if no food is found', async () => {
			const id = '999';
			mockRepository.findOne.mockReturnValue(undefined);

			try {
				await service.findOne(id);
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toContain(`Entity with foodId ${id} not found`);
			}
		});
	});
});

