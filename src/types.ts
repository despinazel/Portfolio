/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  painPoints: string[];
  goals: string[];
  quote: string;
}

export interface MetricCard {
  value: string;
  label: string;
  description: string;
}

export interface TestResult {
  metric: string;
  before: string;
  after: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export type PetType = 'dog' | 'cat' | 'rabbit' | 'bird';

export interface OnboardingState {
  petType: PetType;
  petName: string;
  petAge: number;
  activityLevel: 'low' | 'medium' | 'high';
  habits: string[];
  dietType: string;
  notificationsEnabled: boolean;
}
