import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class DalResourceService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) {}

    async getResourceDetails(companyId: number) {
        const token : any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altiosdevdata.azurewebsites.net/api/Resource/${companyId}`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Login Issue ${error.message}`;
                }),
            ),
        );

        let finalResourceData = {}
        for await(let resource of data) {
            finalResourceData[resource?.email] = resource?.no;
        }
        
        return finalResourceData;
    }
}
