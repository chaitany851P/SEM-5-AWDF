// Simple in-memory rate limiter: max 5 AI requests per user/IP per 60 seconds
const requestTimestamps = new Map();

const checkRateLimit = (clientId) => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const timestamps = (requestTimestamps.get(clientId) || []).filter((time) => now - time < windowMs);

  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  requestTimestamps.set(clientId, timestamps);
  return true;
};

// Generates task description with support for Gemini API, OpenAI API, and Graceful Fallback
const generateTaskDescription = async (title, clientId = 'default') => {
  if (!checkRateLimit(clientId)) {
    throw new Error('Rate limit exceeded: Maximum 5 AI requests per minute. Please try again shortly.');
  }

  const prompt = `Write a clear, professional, single-paragraph task description (under 50 words) for a task titled: "${title}". Be concise and actionable.`;

  // 1. Try Google Gemini API if key is configured
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (generatedText) {
          return {
            description: generatedText,
            provider: 'Google Gemini 1.5 Flash',
            fallback: false
          };
        }
      }
      console.warn('[AI Service] Gemini API returned non-OK status. Falling back to local engine...');
    } catch (err) {
      console.warn('[AI Service] Gemini API request failed:', err.message);
    }
  }

  // 2. Try OpenAI API if key is configured
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey && openAiKey !== 'your_openai_api_key_here') {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100
        })
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.choices?.[0]?.message?.content?.trim();
        if (generatedText) {
          return {
            description: generatedText,
            provider: 'OpenAI gpt-4o-mini',
            fallback: false
          };
        }
      }
      console.warn('[AI Service] OpenAI API returned non-OK status. Falling back to local engine...');
    } catch (err) {
      console.warn('[AI Service] OpenAI API request failed:', err.message);
    }
  }

  // 3. Graceful Degradation / Fallback Engine (Guarantees system remains 100% operational)
  return {
    description: `Complete the necessary milestones, review requirements, and verify implementation for "${title}" to ensure deliverable quality and functional stability.`,
    provider: 'Local Graceful Degradation Engine',
    fallback: true
  };
};

// Suggest priority based on title content
const suggestTaskPriority = (title) => {
  const lower = title.toLowerCase();
  if (lower.includes('urgent') || lower.includes('bug') || lower.includes('fix') || lower.includes('crash') || lower.includes('deploy')) {
    return 'high';
  }
  if (lower.includes('read') || lower.includes('optional') || lower.includes('docs') || lower.includes('cleanup')) {
    return 'low';
  }
  return 'medium';
};

module.exports = {
  generateTaskDescription,
  suggestTaskPriority
};
