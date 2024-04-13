import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tb_food')
export class FoodEntity {
    @PrimaryColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name' })
    name: string;

	@Column({ name: 'image' })
    image: string;

	@Column({ name: 'price' })
    price: number;

    @Column({ name: 'description' })
    description: string;

	@Column({ name: 'category' })
    category: string;

	@Column({ name: 'create_date' })
    createDate: Date;

    @Column({ name: 'update_date', nullable: true })
    updateDate?: Date;
}
