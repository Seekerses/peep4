import {AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {Hit} from './Hit';
import {ValuatedHit} from './ValuatedHit';
import {HitterService} from './hitter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hitter',
  templateUrl: './hitter.component.html',
  styleUrls: ['./hitter.component.css'],
})
export class HitterComponent implements AfterContentChecked{

  hitList: ValuatedHit[];
  title = 'Hitter';
  hitForm: FormGroup;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  constructor(private http: HttpClient, private loginService: LoginService,
              private hitterService: HitterService, private cd: ChangeDetectorRef, private router: Router){
    this.hitForm = new FormGroup({
      xCoordinate: new FormControl('', [ Validators.required, this.customValidator]),
      yCoordinate: new FormControl('', [ Validators.required, this.customValidator]),
      rValue: new FormControl('', [ Validators.required, this.rValidator])
    });
    this.loadHits();
  }

  customValidator(control: FormControl): {[s: string]: boolean}{
    const numberValue = Number.parseFloat(control.value);
    if (isNaN(numberValue)) {
      control.setValue(0);
      return {'Not a number': false};
    }
    if (numberValue > 3 || numberValue < -3){
      control.setValue(0);
      return {'Not in range of -3 ... 3': false};
    }
    return null;
  }

  rValidator(control: FormControl): {[s: string]: boolean}{
    const numberValue = Number.parseFloat(control.value);
    if (isNaN(numberValue)) {
      control.setValue(1);
      return {'Not a number': false};
    }
    if (numberValue > 3 || numberValue < 0){
      control.setValue(1);
      return {'Not in range of 0 ... 3': false};
    }
    return null;
  }

  draw(): void{
    const r = Number.parseFloat(this.hitForm.controls.rValue.value);
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (r !== undefined) {
      this.context.fillStyle = '#EE00FFAA';
      this.context.strokeStyle = '#FFFFFF';
      this.context.beginPath();
      this.context.moveTo(200, 200 - 24 * r);
      this.context.arcTo(200 + 24 * r , 200 - 24 * r, 200 + 24 * r, 200, 24 * r);
      this.context.lineTo(200 + 24 * r / 2, 200);
      this.context.lineTo(200, 200 + 24 * r / 2);
      this.context.lineTo(200, 200);
      this.context.lineTo(200 - 24 * r, 200);
      this.context.lineTo(200 - 24 * r, 200 - 24 * r / 2);
      this.context.lineTo(200, 200 - 24 * r / 2);
      this.context.lineTo(200, 200 - 24 * r);
      this.context.fill();
      this.context.stroke();
    }

    this.context.strokeStyle = '#FFFFFF';
    {
      this.context.beginPath();
      this.context.moveTo(200, 50);
      this.context.lineTo(200, 350);
      this.context.moveTo(200, 50);
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(195, 55);
      this.context.lineTo(200, 50);
      this.context.moveTo(205, 55);
      this.context.lineTo(200, 50);
      this.context.stroke();

      this.context.beginPath();
      let y = 80;
      while (y <= 320){
        this.context.moveTo(195, y);
        this.context.lineTo(205, y);
        y = y + 12;
      }
      this.context.moveTo(195, 80);
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(50, 200);
      this.context.lineTo(350, 200);
      this.context.moveTo(50, 200);
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(345, 195);
      this.context.lineTo(350, 200);
      this.context.moveTo(345, 205);
      this.context.lineTo(350, 200);
      this.context.stroke();

      this.context.beginPath();
      let x = 80;
      while (x <= 320){
        this.context.moveTo(x, 195);
        this.context.lineTo(x, 205);
        x = x + 12;
      }
      this.context.moveTo(80, 195);
      this.context.stroke();
    }

    this.context.fillStyle = '#FFFFFF';
    {
      this.context.fillText('Y', 210, 50);
      this.context.fillText('R', 210, 80);
      this.context.fillText('R/2', 210, 140);
      this.context.fillText('-R/2', 210, 260);
      this.context.fillText('-R', 210, 320);

      this.context.fillText('-R', 80, 190);
      this.context.fillText('-R/2', 140, 190);
      this.context.fillText('R/2', 260, 190);
      this.context.fillText('-R/2', 320, 190);
      this.context.fillText('X', 350, 190);
    }
    if (r !== undefined && !isNaN(r) && this.hitList !== undefined){
      for (const hit of this.hitList.values()){
        if (true === hit.hitResult && r === Number.parseFloat(hit.rValue)){
          this.context.fillStyle = '#00FF00';
          this.context.fillRect((Number.parseFloat(hit.xCoordinate) * 24) + 200, -(Number.parseFloat(hit.yCoordinate) * 24) + 200, 3, 3);
        }
        else if (r === Number.parseFloat(hit.rValue)){
          this.context.fillStyle = '#FF0000';
          this.context.fillRect((Number.parseFloat(hit.xCoordinate) * 24) + 200, -(Number.parseFloat(hit.yCoordinate) * 24) + 200, 3, 3);
        }
      }
    }
  }

  onSubmit(): void {
    this.hitterService.makeHit(new Hit(this.hitForm.controls.xCoordinate.value,
      this.hitForm.controls.yCoordinate.value,
      this.hitForm.controls.rValue.value)).subscribe(
      (data: ValuatedHit) => this.loadHits()
    );
  }

  hitOnGraph(event: MouseEvent): void{
    const r = Number.parseFloat(this.hitForm.controls.rValue.value);
    const x = (event.offsetX - 200) / 24;
    const y = -(event.offsetY - 200) / 24;
    if ( x > 3 || x < -3){
      return;
    }
    if ( y > 3 || y < -3){
      return;
    }
    this.hitterService.makeHit(new Hit( x.toFixed(2), y.toFixed(2), r.toFixed(2))).subscribe(
      (data: ValuatedHit) => this.loadHits()
    );
  }

  loadHits(): void{
    this.http.get('http://localhost:7450/api/hit').subscribe(
      (data: ValuatedHit[]) => {
      this.hitList = data;
      this.cd.markForCheck();
      console.log(this.hitList);
    }
    );
  }

  addHit(hit: ValuatedHit): void{
    this.hitList.push(hit);
  }

  ngAfterContentChecked(): void {
    this.canvas = document.getElementById('graph') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.draw();
  }

  clear(): void {
    this.http.delete('http://localhost:7450/api/hit').subscribe((data) => {
      this.loadHits();
      this.cd.markForCheck();
    });
    this.cd.markForCheck();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  get yCoordinate(): AbstractControl{
    return this.hitForm.get('yCoordinate');
  }
}
