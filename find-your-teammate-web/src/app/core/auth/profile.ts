
export class Profile {
    private _user_id: string;
    private _login: string;
    private _profileName: string;
    private _token: string;
    private _acl: {};

    constructor(token: string, jwt: any) {
        this._token = token;
        this._user_id = jwt.user_id;
        this._login = jwt.name;
        this._profileName = jwt.login;
    }

    public get id(): string {
        return this._user_id;
    }

    public get name(): string {
        return this._login;
    }

    public get profileName(): string {
        return this._profileName;
    }

    public get token(): string {
        return this._token;
    }

    set acl(acl: any) {
        this._acl = acl;
    }

    get acl(): any {
        return this._acl;
    }

}