import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { Menu } from 'src/interface/menu.interface';

@Controller('menu')
@ApiTags('菜单模块')
@ApiBearerAuth('jwt')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('tree')
  getMenuList() {
    return this.menuService.getMenu();
  }

  @Post()
  addMenu(@Body() createMenuDto: Menu) {
    return this.menuService.addMenu(createMenuDto);
  }

  @Put()
  updateMenu(@Body() updateMenuDto: Menu) {
    return this.menuService.updateMenu(updateMenuDto);
  }

  @Get(':id')
  getMenuById(@Param('id') id: number) {
    return this.menuService.findMenuById(id);
  }
}
