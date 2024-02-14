import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class DalCategoryService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }

    async findAllCategories() {
        const companyId = parseInt(process.env.companyId)
        const token : any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altiosdevdata.azurewebsites.net/api/Category/${companyId}`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Login Issue ${error.message}`;
                }),
            ),
        );

        let finalCategoryData = {}
        for await(let category of data) {
            finalCategoryData[category?.email] = category?.no;
        }

        return finalCategoryData;
    }
}
