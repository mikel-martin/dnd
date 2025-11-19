import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  inject,
  NgZone,
} from '@angular/core';
import type {Playlist} from '../../../interfaces/playlist.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {YoutubeService} from '../../../services/youtube.service';

declare let YT: any;

@Component({
  selector: 'app-playlist-item',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.scss',
})
export class PlaylistItemComponent implements OnInit, AfterViewInit {
  @Input({required: true}) playlist!: Playlist;
  @Output() detail = new EventEmitter<void>();

  players: any[] = [];
  looping: boolean[] = [];
  playing: boolean[] = [];
  readyPlayers: boolean[] = [];
  playlistUrls: SafeResourceUrl[] = [];

  private sanitizer = inject(DomSanitizer);

  private youtube = inject(YoutubeService);

  private zone = inject(NgZone);

  ngOnInit() {
    this.playlistUrls = this.playlist.tracks.map(track =>
      this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getYouTubeEmbedUrl(track.url)
      )
    );

    this.looping = Array(this.playlist.tracks.length).fill(false);
    this.playing = Array(this.playlist.tracks.length).fill(false);
    this.readyPlayers = Array(this.playlist.tracks.length).fill(false);

    this.loadYouTubeAPI();
  }

  ngAfterViewInit() {
    this.youtube.ready().then(() => this.initPlayers());
    // if ((window as any).YT) {
    //   this.initPlayers();
    // } else {
    //   (window as any).onYouTubeIframeAPIReady = () => this.initPlayers();
    // }
  }

  private getYouTubeEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  }

  private extractVideoId(url: string): string {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  }

  private loadYouTubeAPI() {
    if ((window as any).YT) return;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  private initPlayers() {
    this.playlist.tracks.forEach((_, index) => {
      const playerId = `player-${this.playlist.id}-${index}`;
      this.players[index] = new YT.Player(playerId, {
        height: '0',
        width: '0',
        videoId: this.extractVideoId(this.playlist.tracks[index].url),
        playerVars: {
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: () => (this.readyPlayers[index] = true),
          onStateChange: (event: any) => this.onPlayerStateChange(event, index),
        },
      });
    });
  }

  private onPlayerStateChange(event: any, index: number) {
    const state = event.data;
    this.zone.run(() => {
      if (state === YT.PlayerState.PLAYING) this.playing[index] = true;
      else if (
        state === YT.PlayerState.PAUSED ||
        state === YT.PlayerState.ENDED
      )
        this.playing[index] = false;

      if (state === YT.PlayerState.ENDED && this.looping[index]) {
        this.players[index].playVideo();
        this.playing[index] = true;
      }
    });
  }

  togglePlay(index: number) {
    if (!this.readyPlayers[index]) return;
    const player = this.players[index];
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) player.pauseVideo();
    else player.playVideo();
  }

  reset(index: number) {
    if (!this.readyPlayers[index]) return;
    const player = this.players[index];
    player.seekTo(0);
    player.pauseVideo();
    this.playing[index] = false;
  }

  toggleLoop(index: number) {
    this.looping[index] = !this.looping[index];
  }

  onDetail() {
    this.detail.emit();
  }
}
