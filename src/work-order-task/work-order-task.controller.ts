import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkOrderTaskService } from './work-order-task.service';
import { CreateWorkOrderTaskDto } from './dto/create-work-order-task.dto';
import { UpdateWorkOrderTaskDto } from './dto/update-work-order-task.dto';

@Controller('work-order-task')
export class WorkOrderTaskController {
  constructor(private readonly workOrderTaskService: WorkOrderTaskService) {}

  @Post()
  create(@Body() createWorkOrderTaskDto: CreateWorkOrderTaskDto) {
    return this.workOrderTaskService.create(createWorkOrderTaskDto);
  }

  @Get()
  findAll() {
    return this.workOrderTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrderTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkOrderTaskDto: UpdateWorkOrderTaskDto) {
    return this.workOrderTaskService.update(+id, updateWorkOrderTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workOrderTaskService.remove(+id);
  }

  @Get('/sync/bulk/:projectName/:issueType')
  async syncIssuesToAltios(@Param('projectName') projectName: string, @Param('issueType') issueType: string) {
    return await this.workOrderTaskService.syncWorkOrderTasksToAltios(projectName, issueType);
  }
}
