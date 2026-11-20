---
title: "The Architecture of a Production AI Voice Agent"
description: "How a real-time voice automation system fits together: telephony, streaming speech-to-text, an LLM planner, tool calls, and text-to-speech under a strict latency budget."
date: "2026-05-02"
tags: ["Voice AI", "Realtime", "Architecture"]
readingTime: "8 min read"
---

Voice is the least forgiving surface for AI. In chat, a two-second pause is unremarkable. On a phone call, it reads as a dropped line. Everything in the design below exists to defend a sub-second response budget while handling thousands of interactions a day.

## The pipeline

- Telephony layer receives the call and opens a bidirectional audio stream.
- Streaming speech-to-text emits partial transcripts continuously, not once at the end.
- A turn detector decides when the caller has actually finished speaking.
- The LLM planner interprets intent and decides whether to answer or call a tool.
- Tools hit internal APIs — bookings, CRM lookups, order status — behind strict timeouts.
- Text-to-speech streams audio back, ideally beginning before the full answer exists.

## Turn-taking is the hard part

Naive silence thresholds either interrupt people mid-sentence or leave dead air. Combining voice activity detection with partial-transcript stability, and allowing barge-in so the caller can cut off the agent, is what makes a call feel human.

## Budget every hop

Write down the target: transcription finalisation, planning, tool call, first synthesised audio. Instrument each hop separately. When a call feels slow, you should know which stage regressed without guessing.

## Design for failure out loud

If a tool times out, the agent should say something useful immediately rather than stall. Deterministic fallback phrases, retry-once semantics, and a clean human handoff path matter more than squeezing another point of model accuracy.

## Observability

Store the transcript, the tool calls with arguments, the latency per stage, and the outcome for every call. Almost every production improvement I have made to a voice system started with replaying a recorded conversation that went wrong.
