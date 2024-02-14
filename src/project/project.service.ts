import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DalProjectService } from 'src/services/dal/project/dal-project.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly dalProjectService: DalProjectService
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findAllByCompanyId(companyId: number) {
    return await this.dalProjectService.findAllProjects(companyId);
  }

  async findProjectByCompanyId(companyId: number, projectNo: string) {
    return await this.dalProjectService.findProjectById(companyId, projectNo);
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
