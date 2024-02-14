import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkOrderTaskDto } from './create-work-order-task.dto';

export class UpdateWorkOrderTaskDto extends PartialType(CreateWorkOrderTaskDto) {}
