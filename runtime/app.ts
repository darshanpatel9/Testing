import { AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, Type } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
<div class="page-header">
  <h1>angular2-img-cropper <button class="btn btn-primary" (click)="resetCroppers()">Reset</button></h1>
</div>
        <div class="row">
        <div class="col-md-9">
            <h3>source</h3>
            <img-cropper #cropper2 [image]="data2" [settings]="cropperSettings2"></img-cropper>
            <div>
                <label class="btn btn-primary">
                    Upload
                    <input id="file_input_file" class="none" type="file" style="display: none;"
                    (change)="onChange($event)"/>
                </label>
            </div>
        </div>
        <h3>result</h3>
        <div class="col-md-3">
            <span *ngIf="data2.image" >
              <img [src]="data2.image" [width]="cropperSettings2.croppedWidth" [height]="cropperSettings2.croppedHeight" style="border-radius: 100px">
            </span>
        </div>
        </div>
    `
})
export class AppComponent extends Type {
    //Cropper 2 data
    public data2:any;

    @ViewChild('cropper2', undefined)

    public onChange:Function;
    public updateCropPosition:Function;
    public resetCroppers:Function;

    constructor() {
        super();

        this.data2 = {};

        this.onChange = ($event: any) => {
            var image: any = new Image();
            var file: File = $event.target.files[0];
            var myReader: FileReader = new FileReader();
            myReader.addEventListener('loadend', (loadEvent: any) => {
                image.src = loadEvent.target.result;
            });
            myReader.readAsDataURL(file);
        }

        this.resetCroppers = () => {
        }
    }
}
