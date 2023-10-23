

export abstract class HttpService {
    protected URI: string = process.env.NEXT_PUBLIC_API_URL as string
    constructor(URI: string) {
        this.URI += URI
    }

    abstract  post<T>(payload: T): Promise<Response>

    abstract  put<T>(payload: T): Promise<Response>

    abstract get<T>(): Promise<Response>
}