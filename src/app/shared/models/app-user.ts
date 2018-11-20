

export interface AppUser {
    uid?: string;
    name?: string;
    email: string;
    isAdmin?: boolean;
    photoURL?: string; 
    address?: {
        city?: string;
        region?: string;
        street?: string;
        zip?: string;
    }
}