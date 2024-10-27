export class Message {
  constructor(
    public text: string,
    public error: boolean = false,
    public response?: [string, (r: string) => void][]) {}
}
