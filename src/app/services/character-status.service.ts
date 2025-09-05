import { Injectable } from '@angular/core';
import type { CharacterStatus } from '../interfaces/character-status.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterStatusService {
  private _statuses: CharacterStatus[] = [
    {
      id: 'blinded',
      icon: '🙈',
      name: 'Blinded',
      color: '#37474F',
    },
    {
      id: 'charmed',
      icon: '💘',
      name: 'Charmed',
      color: '#AD1457',
    },
    {
      id: 'deafened',
      icon: '🙉',
      name: 'Deafened',
      color: '#455A64',
    },
    {
      id: 'frightened',
      icon: '😱',
      name: 'Frightened',
      color: '#E65100',
    },
    {
      id: 'grappled',
      icon: '🤝',
      name: 'Grappled',
      color: '#263238',
    },
    {
      id: 'incapacitated',
      icon: '💤',
      name: 'Incapacitated',
      color: '#6A1B9A',
    },
    {
      id: 'invisible',
      icon: '👻',
      name: 'Invisible',
      color: '#607D8B',
    },
    {
      id: 'paralyzed',
      icon: '🧊',
      name: 'Paralyzed',
      color: '#1565C0',
    },
    {
      id: 'petrified',
      icon: '🪨',
      name: 'Petrified',
      color: '#424242',
    },
    {
      id: 'poisoned',
      icon: '☠️',
      name: 'Poisoned',
      color: '#1B5E20',
    },
    {
      id: 'prone',
      icon: '🤕',
      name: 'Prone',
      color: '#BF360C',
    },
    {
      id: 'restrained',
      icon: '🪢',
      name: 'Restrained',
      color: '#B71C1C',
    },
    {
      id: 'stunned',
      icon: '💫',
      name: 'Stunned',
      color: '#4A148C',
    },
    {
      id: 'unconscious',
      icon: '😵',
      name: 'Unconscious',
      color: '#263238',
    },
    {
      id: 'exhaustion',
      icon: '😩',
      name: 'Exhaustion',
      color: '#37474F',
    },
    {
      id: 'concentrating',
      icon: '🧘‍♂️',
      name: 'Concentrating',
      color: '#0277BD',
    },
    {
      id: 'dead',
      icon: '💀',
      name: 'Dead',
      color: '#000000',
    },
    {
      id: 'burned',
      icon: '🔥',
      name: 'Burned',
      color: '#BF360C',
    },
    {
      id: 'frozen',
      icon: '❄️',
      name: 'Frozen',
      color: '#01579B',
    },
    {
      id: 'electrocuted',
      icon: '⚡',
      name: 'Electrocuted',
      color: '#F57F17',
    },
    {
      id: 'bleeding',
      icon: '🩸',
      name: 'Bleeding',
      color: '#B71C1C',
    },
    {
      id: 'cursed',
      icon: '🧿',
      name: 'Cursed',
      color: '#4A148C',
    },
    {
      id: 'diseased',
      icon: '🤢',
      name: 'Diseased',
      color: '#3E2723',
    },
    {
      id: 'hallucinating',
      icon: '🌈',
      name: 'Hallucinating',
      color: '#6A1B9A',
    },
    {
      id: 'radiant',
      icon: '✨',
      name: 'Radiant',
      color: '#FBC02D',
    },
    {
      id: 'necrotic',
      icon: '🕸️',
      name: 'Necrotic',
      color: '#212121',
    },
    {
      id: 'slowed',
      icon: '🐌',
      name: 'Slowed',
      color: '#01579B',
    },
    {
      id: 'hasted',
      icon: '💨',
      name: 'Hasted',
      color: '#1B5E20',
    },
    {
      id: 'entangled',
      icon: '🌿',
      name: 'Entangled',
      color: '#2E7D32',
    },
    {
      id: 'silenced',
      icon: '🤐',
      name: 'Silenced',
      color: '#263238',
    },
  ];

  get states(): CharacterStatus[] {
    return this._statuses;
  }

  find(id: string): CharacterStatus | undefined {
    return this._statuses.find((status) => status.id === id);
  }

  constructor() {
    this.states.sort((a, b) => a.name.localeCompare(b.name));
  }
}
