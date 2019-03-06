import { Component , ViewChild  } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
  <div class="row">
  <div class="col-sm-6" style="border:1px solid black;">
      <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" ></signature-pad>
      </div>
  </div>
  </div>
  <button  class="btn btn-primary" (click)="drawComplete()"> Save </button>
  <button style="margin-left:5px;" class="btn btn-danger" (click)="clearSignature()"> Clear </button>
 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signature-test';
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  constructor() {
    // no-op
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    const base64 = this.signaturePad.toDataURL('image/png' , 0.5);
    const blob = this.base64toBlob(base64);
    console.log(blob);

  }

  base64toBlob(base64){
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(':')[0];
    const byteNumbers =new Array(byteString.length);
    for(let i = 0; i < byteString.length ; i++){
      byteNumbers[i] = byteString.charAt(i);

    }
    const ia = new Uint8Array(byteNumbers);
    return new Blob([ia], { type: mimeString});
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearSignature(){
      this.signaturePad.clear();
  }
}
