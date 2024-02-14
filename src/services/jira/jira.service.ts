import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';
import { IssueDetails } from './entities/jira-issues.entity';
import { JiraDALTransformService } from './jira-dal-transform.service';

@Injectable()
export class JiraService {
    private jiraToken: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly jiraDalTransformService: JiraDALTransformService
    ) {
        this.jiraToken = `Basic ${Buffer.from(process.env.JIRA_EMAIL + ":" + process.env.JIRA_TOKEN).toString('base64')}`
    }

    async findAllIssuesByProject(projectName: string, issueType: string): Promise<any> {
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altios.atlassian.net/rest/api/3/search?jql=project="${projectName}" AND type="${issueType}"`, { headers: { Authorization: this.jiraToken } }).pipe(
                catchError((error: AxiosError) => {
                    throw `Find Issues Type Data by Project ${error.message}`;
                }),
            ),
        );

        const finalWorkOrderTasksData = await this.jiraDalTransformService.transformtoDALWorkOrderTasks(data);

        return finalWorkOrderTasksData;
    }

    async findIssueDetailsByProject(projectId: string, issueTypeId: string): Promise<IssueDetails> {
        const { data } = await lastValueFrom(
            this.httpService.get<IssueDetails>(`https://altios.atlassian.net/rest/api/3/issue/createmeta/${projectId}/issuetypes/${issueTypeId}`, { headers: { Authorization: this.jiraToken } }).pipe(
                catchError((error: AxiosError) => {
                    throw `Find Issues Details Data by Project ${error.message}`;
                }),
            ),
        );

        return data;
    }


    // async findAllProjects(): Promise<any> {
    //     const { data } = await lastValueFrom(
    //         this.httpService.get<any>(`https://altios.atlassian.net/rest/api/3/project/search`, { headers: { Authorization: this.jiraToken } }).pipe(
    //             catchError((error: AxiosError) => {
    //                 throw `Find Issues Details Data by Project ${error.message}`;
    //             }),
    //         ),
    //     );

    //     let finalData = []

    //     for await (let project of data?.values) {
    //         finalData.push({
    //             id: project?.id,
    //             key: project?.key,
    //             name: project?.name
    //         })
    //     }

    //     return finalData;
    // }

    async getBoardDataByProject(projectName: string) {
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altios.atlassian.net/rest/agile/1.0/board`, { headers: { Authorization: this.jiraToken } }).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw `Find Sprints Data by Project ${error.message}`;
                }),
            ),
        );

        let projectBoardId = 0
        for await (let projectData of data?.values) {
            if (projectData?.location?.projectName === projectName) {
                projectBoardId = projectData?.id;
            }
        }

        return projectBoardId;
    }

    async getSprintsDataByProject(projectBoardId: number) {
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altios.atlassian.net/rest/agile/1.0/board/${projectBoardId}/sprint`, { headers: { Authorization: this.jiraToken } }).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw `Find Sprints Data by Project ${error.message}`;
                }),
            ),
        );


        const finalWorkOrdersData: any = await this.jiraDalTransformService.transformtoDALWorkOrders(data)

        return finalWorkOrdersData;
    }

}
