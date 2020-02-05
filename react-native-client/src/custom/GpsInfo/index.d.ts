export function getAllProviders():Promise<string[]>
export function startListen(provider:string):Promise<[]>
export function addLocationChangedListener(fun:(event:any)=>void):void