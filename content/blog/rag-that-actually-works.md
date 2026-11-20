---
title: "Building RAG That Actually Answers the Question"
description: "Chunking, hybrid retrieval, reranking, grounded prompting and evaluation — the parts of retrieval-augmented generation that decide whether it works."
date: "2026-01-30"
tags: ["RAG", "LLM", "Retrieval"]
readingTime: "7 min read"
---

A first RAG prototype takes a day. Making it reliably correct takes considerably longer, and almost all of that effort goes into retrieval quality rather than the generation step.

## Chunk along meaning

Fixed-size splits cut sentences and tables in half. Split on document structure — headings, sections, list boundaries — with a small overlap, and keep the source title and section path in each chunk's metadata so the model can cite precisely.

## Hybrid retrieval beats pure vectors

Embeddings handle paraphrase well but miss exact identifiers, error codes and product names. Combining dense search with keyword search, then fusing the ranked lists, consistently recalls more of the right context.

## Rerank before you generate

Retrieve generously, then use a cross-encoder to keep only the few genuinely relevant passages. Fewer, better chunks improve grounding and cut latency and cost at the same time.

## Constrain the answer

Instruct the model to answer only from the supplied context and to say plainly when the context is insufficient. Requiring citations makes hallucination visible instead of plausible.

## Evaluate continuously

- Keep a fixed set of real questions with expected sources.
- Track retrieval recall separately from answer quality — they fail for different reasons.
- Re-run the set on every prompt, chunking or model change before shipping it.

> If the right passage never reaches the prompt, no amount of prompt engineering will save the answer.
