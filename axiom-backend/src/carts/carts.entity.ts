import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/products/products.entity';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Products, product => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column()
  quantity: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}