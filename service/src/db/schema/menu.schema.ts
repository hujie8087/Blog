import { SchemaFactory } from '@nestjs/mongoose';
import { Menu } from 'src/interface/menu.interface';

export const MenuSchema = SchemaFactory.createForClass(Menu);
