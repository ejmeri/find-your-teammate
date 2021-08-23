import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { URLSearchParams, Http,  Headers,  RequestOptionsArgs } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeoutWith } from 'rxjs/operators';

@Injectable()
export class ApiService {
    private baseUrl: string = 'http://localhost:4200';

    constructor(@Inject('deploy-config') config: any, private http: HttpClient) {
        this.baseUrl = config.apiUrl;
        // console.log(this.baseUrl, ' base url');
    }

    private verifyPath(path: string): string {
        if (path && path.charAt(0) != '/') {
            return '/' + path;
        }
        return path;
    }

    private observableForError(message: string): Observable<any> {
        return throwError(message);
    }

    private observableForTimeout(): any {
        return this.observableForError('Tempo de espera excedido, por favor, tente novamente.');
    }


    /**
     * Método faz requisições POST NO TOKEN na API
     *
     * @author Elmeri Moreno
     * @version 0.0.1
     *
     * @param path
     * @param data
     * @returns Observable
     */

    public postWithoutToken(path: string, data: any): Observable<any> {
        path = this.verifyPath(path);

        return this.http
            .post(`${this.baseUrl}${path}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Método faz requisições GET (No token) com ou sem parâmetros na API
     *
     * @author Elmeri Moreno
     * @version 0.0.1
     *
     * @param path
     * @param params
     * @param timeout
     * @returns Observable
     */

    public getWithoutToken(path: string, params?: any, timeout: number = 30000): Observable<any> {
        path = this.verifyPath(path);

        return this.http.get(`${this.baseUrl}${path}`, { params: params })
            .pipe(
                map(this.handleApiReturn),
                catchError(this.handleError)
            );
    }

    /**
     * Método faz requisições GET com ou sem parâmetros na API
     *
     * @author Elmeri Moreno
     * @version 0.0.1
     *
     * @param path
     * @param params
     * @param timeout
     * @returns Observable
     */

    public get(path: string, params?: any, timeout: number = 30000): Observable<any> {
        path = this.verifyPath(path);
        
        return this.http.get(`${this.baseUrl}${path}`, { params: params })
            .pipe(
                timeoutWith(timeout, this.observableForTimeout()),
                map(this.handleApiReturn),
                catchError(this.handleError)
            );
    }

    /**
     * Método faz requisições POST na API
     *
     * @author Elmeri Moreno
     * @version 0.0.1
     *
     * @param path
     * @param data
     * @param timeout
     * @returns Observable
     */

    public post(path: string, data: any, timeout: number = 10000): Observable<any> {
        path = this.verifyPath(path);

        return this.http.post(`${this.baseUrl}${path}`, data)
            .pipe(
                timeoutWith(timeout, this.observableForTimeout()),
                map(this.handleApiReturn),
                catchError(this.handleError)
            );
    }

    /**
     * Método faz requisições PUT na API
     *
     * @author Elmeri Moreno
     * @version 0.0.1
     *
     * @param path
     * @param data
     * @param timeout
     * @returns Observable
     */

    public put(path: string, data?: any, timeout: number = 10000): Observable<any> {
        path = this.verifyPath(path);

        return this.http.put(`${this.baseUrl}${path}`, data || {})
            .pipe(
                timeoutWith(timeout, this.observableForTimeout()),
                map(this.handleApiReturn),
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        let errorMessage: string;
        if (error instanceof HttpErrorResponse || error.status > 0) {

            switch (error.status) {
                case 200:
                    return error;
                case 401:
                    errorMessage = 'Você não tem permissão para realizar esta operação, contate o administrador do sistema.';
                    break;
                case 403:
                    errorMessage = 'Efetue o login para acessar o recurso.';
                    break;
                case 400:
                    const payload: any = error?.error || 'Erro durante o processamento'
                    errorMessage = payload.message;
                    break;
                case 404:
                case 405:
                    errorMessage = 'O recurso solicitado não foi encontrado.';
                    break;
                case 503:
                case 504:
                    errorMessage = 'Não foi possível efetuar a conexão com o servidor, verifique sua conexão e atualize a página.';
                    break;
                case 500:
                    errorMessage = 'Ocorreu um erro ao efetuar a requisição, se o erro persistir, contante o administrador.';
                    break;
                default:
                    let body = { error: null };
                    error.json().then((resp: { error: any; }) => body = resp);
                    const err = body.error || JSON.stringify(body);
                    errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
                    break;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else if (error) {
            errorMessage = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : error;
        } else {
            errorMessage = 'Ocorreu um erro ao efetuar a requisição, se o erro persistir, contante o administrador.';
        }

        
        return throwError(errorMessage);
    }

    public handleApiReturn(resp: Response | any) {
        if (resp) {
            let apiReturn: any;
            try {
                apiReturn = resp;
            } catch (ex) {
                throw new Error('Não foi possível processar sua requisição. Se o erro persistir, contate o suporte do sistema.');
            }
            if (apiReturn.status === true) {
                return apiReturn.response;
            } else if (apiReturn.status === false) {
                if (apiReturn.error) {
                    throw new Error(apiReturn.error);
                } else {
                    throw new Error('Ocorreu um erro durante a operação, tente novamente.');
                }
            }
        }

        return resp;
    }
}
