import { EventEmitter } from "react-native";

export function getAllProviders(): Promise<string[]>
export function isListening(): Promise<boolean>
export function startListen(provider: string, minTime: number, minDistance: number): Promise<any>
export function stopListen(): Promise<any>
export function addLocationChangedListener(fun: (event: { "latitude": number, "longitude": number, "provider": string, "time": number }) => void): Promise<EventEmitter | any>