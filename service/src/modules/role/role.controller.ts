import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from 'src/interface/role.interface';

@Controller('role')
@ApiTags('角色模块')
@ApiBearerAuth('jwt')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  addRole(@Body() createRoleDto: Role) {
    return this.roleService.addRole(createRoleDto);
  }

  @Get()
  findAll(@Query() query) {
    const page = {
      pageNum: Number(query.pageNum),
      pageSize: Number(query.pageSize),
    };
    const map = JSON.parse(JSON.stringify(query));
    delete map.pageNum;
    delete map.pageSize;
    return this.roleService.getRoleList(map, page);
  }

  @Delete()
  delRole(@Query() { id }) {
    return this.roleService.delRole(id);
  }

  @Put()
  updateRole(@Body() updateRoleDto: Role) {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Get(':id')
  getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(+id);
  }
}
