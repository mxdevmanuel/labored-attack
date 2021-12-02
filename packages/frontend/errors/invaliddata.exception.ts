export default class InvalidDataException extends Error {
  messages: Record<string, string[]>;

  constructor(message: string, messages: Record<string, string[]>) {
    super(message);
    this.messages = messages;
    Object.setPrototypeOf(this, InvalidDataException.prototype);
  }
}
