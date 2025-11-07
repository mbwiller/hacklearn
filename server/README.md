# HackLearn Backend API

Production-grade Express.js backend API for proxying LLM requests to OpenAI. Built with TypeScript, featuring rate limiting, streaming support, and comprehensive error handling.

## Features

- **LLM Proxy**: Secure proxy for OpenAI API calls
- **Rate Limiting**: 10 requests/minute per IP to prevent abuse
- **Streaming Support**: Real-time response streaming via Server-Sent Events
- **Token Tracking**: Automatic token usage and cost calculation
- **Error Handling**: Production-ready error messages with detailed logging
- **CORS Configured**: Works with Vite dev server and Docker deployment
- **Type Safety**: Full TypeScript strict mode compliance

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file (optional - API keys are sent from frontend):

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
```

### 3. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### 4. Verify Server is Running

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T01:00:00.000Z",
  "uptime": 12.345,
  "environment": "development"
}
```

## API Documentation

### POST /api/llm/chat

Main LLM proxy endpoint. Forwards chat requests to OpenAI with rate limiting and cost tracking.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```typescript
{
  model: 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4',
  messages: Array<{
    role: 'system' | 'user' | 'assistant',
    content: string
  }>,
  apiKey: string,  // OpenAI API key (starts with 'sk-')
  stream?: boolean // Optional, defaults to false
}
```

#### Response (Non-Streaming)

**Success (200):**
```json
{
  "success": true,
  "data": {
    "message": "The AI's response...",
    "usage": {
      "prompt_tokens": 50,
      "completion_tokens": 100,
      "total_tokens": 150
    },
    "cost": 0.000023,
    "model": "gpt-4o-mini"
  }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid OpenAI API key. Please check your API key and try again."
  }
}
```

#### Response (Streaming)

**Content-Type:** `text/event-stream`

**Format:**
```
data: {"delta": "Hello", "done": false}

data: {"delta": " world", "done": false}

data: {"usage": {...}, "cost": 0.000023, "done": true}

```

#### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_API_KEY` | 401 | Invalid or missing OpenAI API key |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests (10/min limit) |
| `INVALID_REQUEST` | 400 | Invalid request body or parameters |
| `NETWORK_ERROR` | 503 | OpenAI service unavailable |
| `SERVER_ERROR` | 500 | Internal server error |

### GET /health

Health check endpoint for monitoring.

#### Response

```json
{
  "status": "ok",
  "timestamp": "2025-11-06T01:00:00.000Z",
  "uptime": 12.345,
  "environment": "development"
}
```

## Architecture

### File Structure

```
server/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── routes/
│   │   └── llm.ts            # LLM endpoint handler
│   ├── middleware/
│   │   ├── rateLimiter.ts    # Rate limiting (10 req/min)
│   │   ├── errorHandler.ts   # Global error handler
│   │   └── cors.ts           # CORS configuration
│   ├── services/
│   │   └── openai.ts         # OpenAI API integration
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── .env.example              # Environment variable template
├── package.json
├── tsconfig.json
└── README.md
```

### Request Flow

1. **Frontend** sends request to `/api/llm/chat`
2. **Vite Proxy** forwards to `localhost:3001`
3. **Rate Limiter** checks request count (10/min limit)
4. **LLM Route** validates request body
5. **OpenAI Service** makes API call with user's key
6. **Response Handler** formats and returns result
7. **Logger** logs token usage and cost

### Technology Stack

- **Express 4.18.2**: Web framework
- **OpenAI SDK 4.20.0**: Official OpenAI client
- **TypeScript 5.3.3**: Type safety
- **express-rate-limit 7.1.5**: Rate limiting
- **dotenv 16.3.1**: Environment configuration
- **tsx 4.7.0**: Fast TypeScript execution
- **nodemon 3.0.2**: Auto-reload during development

## Development

### Running Backend Only

```bash
npm run dev
```

### Running Full Stack

**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd ..
npm run dev
```

Frontend will proxy `/api` requests to backend automatically.

### Building for Production

```bash
npm run build
```

Output: `dist/` directory with compiled JavaScript.

### Running Production Build

```bash
npm start
```

## Rate Limiting

**Configuration:**
- **Window**: 60 seconds
- **Max Requests**: 10 per IP
- **Storage**: In-memory (single-server)

**Bypass Logic:**
- Requests under 500ms don't count toward limit
- Allows rapid testing during development

**Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1699564800
```

## Token Pricing (as of January 2025)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| gpt-4o-mini | $0.15 | $0.60 |
| gpt-4o | $2.50 | $10.00 |
| gpt-4 | $30.00 | $60.00 |

Costs are calculated automatically and returned in every response.

## Error Handling

### Development Mode

- Full stack traces in console
- Detailed error messages to client
- Request/response logging

### Production Mode

- No stack traces exposed
- Generic error messages to client
- Structured logging only

**Example:**
```typescript
// Development
{ error: { code: 'SERVER_ERROR', message: 'TypeError: Cannot read property...' } }

// Production
{ error: { code: 'SERVER_ERROR', message: 'An unexpected error occurred' } }
```

## Security

### API Key Handling

- **NOT stored server-side** - users provide their own keys
- Validated format (must start with `sk-`)
- Sent in request body (not headers for easier debugging)
- Never logged or persisted

### CORS Configuration

Allowed origins:
- `http://localhost:3000` (Vite dev server)
- `http://localhost:8080` (Docker production)
- `http://localhost:4173` (Vite preview)

### Rate Limiting

Prevents abuse by limiting to 10 requests/minute per IP address.

## Logging

**Console Output:**
```
==================================================
HackLearn Backend API Server
==================================================
Environment: development
Server running on: http://localhost:3001
Health check: http://localhost:3001/health
==================================================

[2025-11-06T01:00:00.000Z] POST /api/llm/chat - 200 (1234ms)
[LLM] Non-streaming request: { model: 'gpt-4o-mini', messageCount: 2, stream: false }
[OpenAI] Chat completion: { model: 'gpt-4o-mini', usage: {...}, cost: '$0.000023', messageLength: 150 }
[LLM] Non-streaming completed in 1234ms
```

## Troubleshooting

### Server won't start

**Error:** `EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3001 | xargs kill
```

### API key validation fails

**Error:** `Invalid API key format`

**Solution:**
- Ensure key starts with `sk-`
- Check for extra whitespace
- Get valid key from https://platform.openai.com/api-keys

### CORS errors

**Error:** `Access to fetch at 'http://localhost:3001' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution:**
- Verify Vite proxy is configured (see root `vite.config.ts`)
- Check CORS middleware allows your origin
- Use `/api/llm/chat` path (not direct URL)

### Rate limit hit during testing

**Error:** `Too many requests. Please wait before trying again.`

**Solution:**
- Wait 60 seconds for window to reset
- Or modify `RATE_LIMIT_MAX_REQUESTS` in `.env`
- Or add delay between test requests

## Testing

### Manual Testing with curl

**Health Check:**
```bash
curl http://localhost:3001/health
```

**Non-Streaming Chat:**
```bash
curl -X POST http://localhost:3001/api/llm/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "apiKey": "sk-your-api-key-here",
    "stream": false
  }'
```

**Streaming Chat:**
```bash
curl -N -X POST http://localhost:3001/api/llm/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Count to 5"}
    ],
    "apiKey": "sk-your-api-key-here",
    "stream": true
  }'
```

### Rate Limit Testing

```bash
# Bash script to test rate limiting
for i in {1..11}; do
  echo "Request $i"
  curl -s -X POST http://localhost:3001/api/llm/chat \
    -H "Content-Type: application/json" \
    -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hi"}],"apiKey":"sk-test"}' | jq '.error.code'
done
```

Expected: First 10 succeed, 11th returns `RATE_LIMIT_EXCEEDED`

## Future Enhancements

This backend is architected to easily support additional LLM providers:

- **Claude (Anthropic)**: Different API structure, pricing
- **Deepseek**: OpenAI-compatible alternative
- **Grok (xAI)**: Alternative commercial model
- **Ollama**: Local models (free, no API key required)

To add a provider:
1. Create `src/services/[provider].ts`
2. Implement service interface
3. Add provider selection to route
4. Update pricing in `types/index.ts`

## Support

**Issues:** https://github.com/mbwiller/hacklearn/issues

**Documentation:** See root `README.md` and `CLAUDE.md`

---

**Built with TypeScript + Express + OpenAI SDK**
