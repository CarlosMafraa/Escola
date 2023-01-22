import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {YoutubeService} from "../Service/youtube/youtube.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public videos: any [];

  constructor(
    private youtube: YoutubeService,
  ) { }

  ngOnInit(): void {
    this.videos = [];
    this.youtube.getVideosForChanel('@ruanmafra9056',1).pipe().subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }
      });

}
}
