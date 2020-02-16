import { EventEmitter } from "react-native";

export class LocationListener{
    name:string
    onLocationChanged:(event: { "latitude": number, "longitude": number, "provider": string, "time": number }) => void
    constructor(name:string,onLocationChanged:(event: { "latitude": number, "longitude": number, "provider": string, "time": number }) => void);
}
export function getAllProviders(): Promise<string[]>
export function isListening(): Promise<boolean>
export function startListen(provider: string, minTime: number, minDistance: number,locationListener:LocationListener): Promise<any>
export function stopListen(locationListener:LocationListener): Promise<any>
