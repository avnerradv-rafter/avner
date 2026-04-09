// Shared TypeScript types between mobile and API

export type UserId = string;
export type MatchId = string;
export type MessageId = string;

export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED' | 'PENDING_DELETION';
export type MatchStatus = 'PENDING' | 'MATCHED' | 'UNMATCHED';
export type MessageType = 'TEXT' | 'IMAGE' | 'VOICE' | 'SYSTEM';
export type ReportCategory = 'HARASSMENT' | 'BLACKMAIL' | 'FAKE_PROFILE' | 'STIGMA' | 'SPAM' | 'OTHER';

export interface UserProfile {
  userId: UserId;
  displayName: string;
  bio?: string;
  age?: number;
  gender?: string;
  orientation?: string;
  lookingFor?: string;
  locationCity?: string;
  profileCompleteness: number;
  photos: PhotoMeta[];
}

export interface PhotoMeta {
  id: string;
  orderIndex: number;
}

export interface MedicalProfilePublic {
  hivStatus?: 'positive' | 'negative' | 'prefer_not_to_say';
  onTreatment?: boolean;
  undetectable?: boolean;
}

export interface MatchCard {
  matchId: MatchId;
  userId: UserId;
  displayName: string;
  age?: number;
  locationCity?: string;
  bio?: string;
  primaryPhotoId?: string;
  matchedAt: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface DiscoverCard {
  userId: UserId;
  displayName: string;
  age?: number;
  locationCity?: string;
  bio?: string;
  primaryPhotoId?: string;
  medicalProfile?: MedicalProfilePublic;
  distanceKm?: number;
}

export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}
