
// Define interfaces for your data structures
export interface AIMessage {
    sender: 'user' | 'bot' | 'typing';
    text: string;
    timestamp: string;
}

export interface ConversationContextItem {
    sender: 'user' | 'bot';
    message: string;
    category: string;
    intent: string;
}

export interface ConversationPattern {
    name: string;
    steps: Array<{
        type: 'user' | 'bot';
        intent: string;
    }>;
    response: string;
}

export interface ServiceOptionGroup {
    group: string;
    options: string[];
}

export interface AIResponseCategory {
    keywords: string[];
    responses: string[];
    priority: number;
    intent: string;
    followUp?: string;
    followUpThreshold?: number;
    reachMessages?: Record<string, string>;
}

export interface AIResponses {
    [key: string]: AIResponseCategory;
}

export interface AnalyticsEvent {
    event: string;
    timestamp: string;
    [key: string]: any;
}