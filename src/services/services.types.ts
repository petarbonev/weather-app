export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Endpoints = {
    [key: string]: {
        url?: string;
        method: Method;
        urlFunction?: (pathParams: Record<string, string | number | boolean>) => string;
    }
};
