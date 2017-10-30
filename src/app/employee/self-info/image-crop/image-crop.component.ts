import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Cropper from 'cropperjs';
import {UserInfo} from '../../../domain/entities';
import {ImageService} from './image.service';
import {UserService} from '../../../core/user.service';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit, AfterViewInit {
  init = false;
  cropper;
  imgData: ImgData;
  url: string;
  newImg: string;
  @Input()
  currUser: UserInfo;
  @ViewChild('image')
  image: ElementRef;
  tooLarge = false;
  success = false;
  size;

  constructor(private imageService: ImageService, private userService: UserService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let image = this.image.nativeElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1 / 1
    });
  }

  getImgUrl($event) {
    const file = $event.path[0].files[0];
    this.cropper.replace(window.URL.createObjectURL(file));
    this.newImg = this.currUser.userId + '.' + file.name.split('.')[1];
    this.init = true;
  }

  zoom(num: number) {
    this.cropper.zoom(num);
  }

  rotate(num: number) {
    this.cropper.rotate(num);
  }

  reset() {
    this.cropper.reset();
  }

  cropImg() {
    this.url = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
    this.imgData = new ImgData(this.url, this.newImg);
    this.size = JSON.stringify(this.imgData).length;
    if (this.size > 2000 * 1024) {
      this.tooLarge = true;
    } else {
      this.imageService.upLoadImg(this.imgData).subscribe(photo => {
        if (photo != '0') {
          this.currUser.photo = photo + '?t=' + Math.random();
          this.userService.updateUser(this.currUser);
          this.imgData = null;
          this.tooLarge = false;
          this.success = true;
        }
      });
    }
  }
}

export class ImgData {
  constructor(public url: string,
              public name: string) {
  }
}

