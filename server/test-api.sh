#!/bin/bash

# Test script for HackLearn Backend API

BASE_URL="http://127.0.0.1:3001"

echo "=========================================="
echo "HackLearn Backend API Test Suite"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
curl -s "$BASE_URL/health" | jq '.'
echo ""
echo ""

# Test 2: Invalid API Key Format
echo "Test 2: Invalid API Key Format"
curl -s -X POST "$BASE_URL/api/llm/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello"}],
    "apiKey": "invalid-key-format"
  }' | jq '.'
echo ""
echo ""

# Test 3: Missing Required Field (model)
echo "Test 3: Missing Required Field"
curl -s -X POST "$BASE_URL/api/llm/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "apiKey": "sk-test123"
  }' | jq '.'
echo ""
echo ""

# Test 4: Invalid Model
echo "Test 4: Invalid Model"
curl -s -X POST "$BASE_URL/api/llm/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5",
    "messages": [{"role": "user", "content": "Hello"}],
    "apiKey": "sk-test123"
  }' | jq '.'
echo ""
echo ""

# Test 5: Rate Limiting (11 requests)
echo "Test 5: Rate Limiting (should fail on 11th request)"
for i in {1..11}; do
  echo "Request $i:"
  RESPONSE=$(curl -s -X POST "$BASE_URL/api/llm/chat" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gpt-4o-mini",
      "messages": [{"role": "user", "content": "Hi"}],
      "apiKey": "sk-fake-key-for-testing"
    }')
  echo "$RESPONSE" | jq -r '.error.code // "SUCCESS"'
done
echo ""
echo ""

echo "=========================================="
echo "Test Suite Complete"
echo "=========================================="
