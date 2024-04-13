import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

export const CreateFoodSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Create Food' }),
		ApiConsumes('multipart/form-data'),
		ApiBody({ type: CreateFoodDto }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const FindAllFoodSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'FindAll Food' }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const FindOneFoodSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'FindOne Food' }),
		ApiParam({ name: 'id', required: true }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Food Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const UpdateFoodSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Update Food' }),
		ApiParam({ name: 'id', required: true }),
		ApiConsumes('multipart/form-data'),
		ApiBody({ type: UpdateFoodDto }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Food Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const DeleteFoodSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete Food' }),
		ApiParam({ name: 'id', required: true }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Food Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}
