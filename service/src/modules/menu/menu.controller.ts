import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { Menu } from 'src/interface/menu.interface';

@Controller('menu')
@ApiTags('菜单模块')
@ApiBearerAuth('jwt')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  getMenuList() {
    return this.menuService.getMenu();
  }

  @Post()
  addMenu(@Body() createMenuDto: Menu) {
    return this.menuService.addMenu(createMenuDto);
  }
}
