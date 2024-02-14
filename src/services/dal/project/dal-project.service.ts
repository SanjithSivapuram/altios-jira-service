import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class DalProjectService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }

    async findAllProjects(companyId: number) {
        const token : any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altiosdevdata.azurewebsites.net/api/Project/${companyId}`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Login Issue ${error.message}`;
                }),
            ),
        );

        return data;
    }

    async findProjectById(companyId: number, projectNo: string) {
        const token : any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altiosdevdata.azurewebsites.net/api/Project/${companyId}/${projectNo}`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Login Issue ${error.message}`;
                }),
            ),
        );

        return data;
    }
}
