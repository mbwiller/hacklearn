import { useState } from 'react';
import { Eye, EyeOff, Key, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// Supabase Edge Function URL (environment-aware)
const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ajigpytercayzftfjtle.supabase.co/functions/v1';
const API_BASE_URL = `${SUPABASE_FUNCTIONS_URL}/llm-chat`;

export const ApiKeyManager = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('hacklearn_openai_api_key') || '';
  });
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  // Validate API key format
  const validateApiKey = (key: string): boolean => {
    if (!key) {
      setValidationError('API key is required');
      return false;
    }
    if (!key.startsWith('sk-')) {
      setValidationError('API key must start with "sk-"');
      return false;
    }
    if (key.length < 20) {
      setValidationError('API key appears to be invalid (too short)');
      return false;
    }
    setValidationError('');
    return true;
  };

  // Handle API key input change
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    setTestStatus('idle');
    setTestMessage('');

    // Validate on change
    if (newKey) {
      validateApiKey(newKey);
    } else {
      setValidationError('');
    }
  };

  // Save API key to localStorage
  const handleSaveKey = () => {
    if (validateApiKey(apiKey)) {
      localStorage.setItem('hacklearn_openai_api_key', apiKey);
      setTestMessage('API key saved successfully');
      setTestStatus('success');
    }
  };

  // Test API key with a simple request
  const handleTestConnection = async () => {
    if (!validateApiKey(apiKey)) {
      return;
    }

    setIsTesting(true);
    setTestStatus('idle');
    setTestMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Say "test successful" if you can read this.' }],
          apiKey: apiKey,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Connection test failed');
      }

      const data = await response.json();

      if (data.success) {
        // Save key on successful test
        localStorage.setItem('hacklearn_openai_api_key', apiKey);
        setTestStatus('success');
        setTestMessage('Connection successful! API key is valid and saved.');
      } else {
        throw new Error(data.error?.message || 'Test failed');
      }
    } catch (error) {
      setTestStatus('error');
      setTestMessage(
        error instanceof Error ? error.message : 'Failed to test connection. Please check your API key.'
      );
    } finally {
      setIsTesting(false);
    }
  };

  // Clear API key
  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem('hacklearn_openai_api_key');
    setTestStatus('idle');
    setTestMessage('');
    setValidationError('');
  };

  // Get masked version of API key for display
  const getMaskedKey = (key: string): string => {
    if (key.length <= 8) return key;
    return `${key.slice(0, 7)}...${key.slice(-4)}`;
  };

  return (
    <Card className="bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1F1F1F]">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              OpenAI API Configuration
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your OpenAI API key to enable playground features
            </p>
          </div>
        </div>

        <div className="relative">
          <Input
            label="API Key"
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={handleKeyChange}
            placeholder="sk-..."
            error={validationError}
            helperText="Your API key is stored locally and never sent to our servers"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-[42px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label={showKey ? 'Hide API key' : 'Show API key'}
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {apiKey && !showKey && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current key: <code className="text-cyan-400">{getMaskedKey(apiKey)}</code>
          </p>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleTestConnection}
            disabled={!apiKey || !!validationError || isTesting}
            variant="primary"
            size="md"
            className="flex-1"
          >
            {isTesting ? 'Testing...' : 'Test Connection'}
          </Button>

          <Button
            onClick={handleSaveKey}
            disabled={!apiKey || !!validationError}
            variant="secondary"
            size="md"
          >
            Save Key
          </Button>

          {apiKey && (
            <Button
              onClick={handleClearKey}
              variant="outline"
              size="md"
            >
              Clear
            </Button>
          )}
        </div>

        {testMessage && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              testStatus === 'success'
                ? 'bg-green-500/10 border border-green-500/30'
                : testStatus === 'error'
                ? 'bg-red-500/10 border border-red-500/30'
                : ''
            }`}
          >
            {testStatus === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
            {testStatus === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
            <p
              className={`text-sm ${
                testStatus === 'success'
                  ? 'text-green-400'
                  : testStatus === 'error'
                  ? 'text-red-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {testMessage}
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200 dark:border-[#1F1F1F]">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            <strong>Note:</strong> Your API key is stored in your browser&apos;s local storage and is only used to
            communicate with OpenAI through our backend server. Get your API key from{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              OpenAI Platform
            </a>
            .
          </p>
        </div>
      </div>
    </Card>
  );
};
