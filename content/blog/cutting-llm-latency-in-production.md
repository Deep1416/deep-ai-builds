---
title: "Cutting LLM Latency by 40% in Production"
description: "The concrete changes — streaming, caching, prompt slimming and concurrency control — that took a production LLM feature from sluggish to responsive."
date: "2026-06-18"
tags: ["LLM", "Performance", "FastAPI"]
readingTime: "7 min read"
---

Most LLM latency problems are not model problems. In the systems I have shipped, the majority of the wall-clock time users felt came from everything around the model call: oversized prompts, sequential I/O, cold caches, and waiting for a full response before rendering anything.

## 1. Stream first, optimise second

Streaming does not reduce total generation time, but it collapses perceived latency because the first token arrives in a few hundred milliseconds instead of several seconds. Server-sent events from FastAPI plus an incremental renderer on the client is usually the single highest-impact change you can make in an afternoon.

```python
@router.post("/chat")
async def chat(payload: ChatRequest):
    async def events():
        async for chunk in llm.stream(payload.messages):
            yield f"data: {chunk}\n\n"
    return StreamingResponse(events(), media_type="text/event-stream")
```

## 2. Put a cache in front of determinism

A surprising share of production traffic is repeated: the same document summarised, the same FAQ asked, the same retrieval query issued. A Redis cache keyed on a normalised prompt hash plus model and temperature returns those in single-digit milliseconds.

- Normalise whitespace and casing before hashing so trivial differences still hit.
- Include model name, temperature and prompt version in the key — never cache across versions.
- Set a TTL that matches how quickly your source data changes, not an arbitrary day.

## 3. Trim the prompt, not the quality

Long system prompts and unfiltered retrieval context inflate both latency and cost. Reranking retrieved chunks and keeping only the top few relevant passages usually improves answer quality while shrinking the payload — a rare change that wins on both axes.

## 4. Parallelise the surrounding I/O

Retrieval, user context lookups, and tool calls are often independent. Running them concurrently with asyncio.gather instead of sequentially removed hundreds of milliseconds per request in my own services.

## 5. Protect the tail

Add per-request timeouts, a bounded concurrency semaphore, and a fallback to a smaller model. Median latency looks fine without them; the 99th percentile is what users complain about.

> Measure end-to-end from the browser. Provider-reported latency hides queueing, retries and your own serialisation cost.
