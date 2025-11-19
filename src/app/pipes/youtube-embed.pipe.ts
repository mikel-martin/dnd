import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'youtubeEmbed',
})
export class YoutubeEmbedPipe implements PipeTransform {
  transform(url: string): string {
    if (!url) return '';

    // Caso 1: URL normal
    if (url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?`;
    }

    // Caso 2: Short URL (youtu.be)
    if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}?`;
    }

    // Si ya está en embed, lo devuelve igual
    if (url.includes('/embed/')) {
      return url;
    }

    return url;
  }
}
