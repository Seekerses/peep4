export class ValuatedHit{
  xCoordinate: string;
  yCoordinate: string;
  rValue: string;
  hitResult: boolean;


  constructor(xCoordinate: string, yCoordinate: string, rValue: string, isHit: boolean) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.rValue = rValue;
    this.hitResult = isHit;
  }
}
