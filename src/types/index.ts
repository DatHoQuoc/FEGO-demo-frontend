// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tokens: number;
  maxTokens: number;
  tier: 'free' | 'pro' | 'enterprise';
}

// Chat types
export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
  status?: 'sending' | 'sent' | 'error';
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

export interface ProblemInput {
  text?: string;
  image?: File;
  type: 'geometry' | 'vector' | 'coordinate';
}

// Job types
export type JobStatus = 'queued' | 'processing' | 'complete' | 'error' | 'cancelled';

export interface ProcessingStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  description?: string;
}

export interface Job {
  jobId: string;
  conversationId: string;
  status: JobStatus;
  progress: number;
  currentStage: number;
  stages: ProcessingStage[];
  estimatedSeconds: number;
  elapsedSeconds: number;
  createdAt: Date;
  error?: string;
}

export interface JobResponse {
  jobId: string;
  status: 'queued' | 'processing';
  estimatedTime: number;
}
