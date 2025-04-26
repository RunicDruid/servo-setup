const XMLHttpRequest = require('xhr2');
const xhr = new XMLHttpRequest();

export interface WEBCALLPROPS {
    id?: string,
}

export interface WEBCALLBODY {
    method:
        'POST' | 
        'GET',
    endpoint:
        'servo/'    |
        'ping/'
}


export class WEBCALL {
    props: WEBCALLPROPS;
    name: string = 'WEBCALL';

    constructor(attrs: WEBCALLPROPS = {}) {
        const defaults: WEBCALLPROPS = {
            id: this.createGuid(),
        };
        this.props = { ...defaults, ...attrs };
    }

    createGuid(hyphen: boolean = true): string {
        let guid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c): string => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        if (hyphen === false) guid = guid.replace(/-/g, '');
        return guid;
    }

    checkUser(req: any, link: string, method: string) {
        const user = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const data = {
            method: method,
            user: user,
            link: link
        }
        return data;
    }

    async webcall(data: WEBCALLBODY) {
        switch (data.method) {
            case "GET":
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        console.log(xhr.response);
                    }
                }
                xhr.open(data.method, 'http://192.168.1.7:8084' + '/' + data.endpoint, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                xhr.send();
                break;
            default:
                break;
        }
    }

}