import { Column, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Client {
    @PrimaryGeneratedColumn('increment')
    id: number;



}
