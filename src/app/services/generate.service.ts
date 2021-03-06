import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppConfig, AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {
  private readonly authHeader: string = '';
  private readonly testUserId: string = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; // TODO: Create global state for user management

  constructor(private readonly http: HttpClient, private readonly appConfigService: AppConfigService) {
  }

  generateIccSingle(): Observable<any> {
    const serviceUrl = this.appConfigService.getConfig().apiUrl + '/GenerateIcc/single';
    return this.http.post(serviceUrl, { UserId: this.testUserId }).pipe(catchError(this.errorHandler));
  }

  generateIccBatch(): Observable<any> {
    const serviceUrl = this.appConfigService.getConfig().apiUrl + '/GenerateIcc/batch';
    return this.http.post(serviceUrl, { UserId: this.testUserId }).pipe(catchError(this.errorHandler));
  }

  generateDownloadCsv(): Observable<any> {
    const serviceUrl = this.appConfigService.getConfig().apiUrl + '/GenerateIcc/batch-csv';
    return this.http.post(serviceUrl,
      { 'UserId': '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
      {
        observe: 'response',
        responseType: (('blob') as any) as 'json'
      });
  }

  downloadCsv(iccBatchId) {
    const serviceUrl = `${this.appConfigService.getConfig().apiUrl}/GenerateIcc/batch-csv?batchId=${iccBatchId}`;
    return this.http.get(serviceUrl, { responseType: 'blob' });
  }

  private errorHandler(error: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    // TODO error handling
    throw error;
  }
}
