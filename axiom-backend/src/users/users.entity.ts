import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Carts } from 'src/carts/carts.entity'; // Importar la entidad Carts

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Asegúrate de que el correo sea único
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Carts, cart => cart.user)
  carts: Carts[]; // Relación con los carritos

}