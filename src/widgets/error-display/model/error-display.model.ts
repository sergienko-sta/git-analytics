export interface IErrorDisplayProps {
    error: Error | null;
    title?: string;
    onRetry?: () => void;
}
