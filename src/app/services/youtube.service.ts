import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiReady = new Promise<void>(resolve => {
    if ((window as any).YT) resolve();
    else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = () => resolve();
    }
  });

  ready(): Promise<void> {
    return this.apiReady;
  }
}
