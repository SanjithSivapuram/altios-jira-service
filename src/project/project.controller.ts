import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('/company/:companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.projectService.findAllByCompanyId(+companyId);
  }

  @Get('/company/:companyId/:projectNo')
  findOne(@Param('companyId') companyId: string, @Param('projectNo') projectNo: string) {
    return this.projectService.findProjectByCompanyId(+companyId, projectNo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
