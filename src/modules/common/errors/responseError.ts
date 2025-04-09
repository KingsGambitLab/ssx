export default class ResponseError extends Error {
  isFromServer: any;

  response: any;

  responseJson: any;

  constructor(
    msg: string,
    isFromServer: boolean,
    response: any,
    responseJson: any,
  ) {
    super(msg);
    this.isFromServer = isFromServer;
    this.response = response;
    this.responseJson = responseJson;
  }
}
