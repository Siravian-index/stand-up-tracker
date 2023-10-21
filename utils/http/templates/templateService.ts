import { HttpService } from "../httpService";


export class TemplateService extends HttpService {
    constructor(path = "/templates") {
        super(path)
    }

    post<T>(payload: T): Promise<Response> {
        return fetch(this.URI, {
            method: "POST",
            body: JSON.stringify(payload)
        })
    }

    get<T>(query = ""): Promise<Response> {
        return fetch(`${this.URI}${query}`)
    }

}

