import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EnvErrorDisplayProps {
  missingVars: string[];
}

const EnvErrorDisplay = ({ missingVars }: EnvErrorDisplayProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-heading font-bold mb-2">
            Configuration Error
          </AlertTitle>
          <AlertDescription className="space-y-3">
            <p className="text-sm">
              The following environment variables are missing or not configured:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-2">
              {missingVars.map((varName) => (
                <li key={varName} className="font-mono">
                  {varName}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4">
              Please check your <code className="bg-muted px-1.5 py-0.5 rounded">.env</code> file
              and ensure all required API keys are configured.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default EnvErrorDisplay;
