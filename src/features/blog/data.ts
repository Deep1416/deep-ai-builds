/**
 * Blog content. Add a new object to `posts` to publish an article.
 * `body` blocks render in order: h2, p, list, code, quote.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  updated?: string;
  readingTime: string;
  tags: readonly string[];
  body: readonly BlogBlock[];
};

export const blogMeta = {
  title: "Engineering Notes",
  description:
    "Practical notes on production LLM systems, AI voice automation, FastAPI backends, and shipping full stack products that survive real traffic.",
};

export const posts: readonly BlogPost[] = [
  {
    slug: "cutting-llm-latency-in-production",
    title: "Cutting LLM Latency by 40% in Production",
    description:
      "The concrete changes — streaming, caching, prompt slimming and concurrency control — that took a production LLM feature from sluggish to responsive.",
    date: "2026-06-18",
    readingTime: "7 min read",
    tags: ["LLM", "Performance", "FastAPI"],
    body: [
      {
        type: "p",
        text: "Most LLM latency problems are not model problems. In the systems I have shipped, the majority of the wall-clock time users felt came from everything around the model call: oversized prompts, sequential I/O, cold caches, and waiting for a full response before rendering anything.",
      },
      { type: "h2", text: "1. Stream first, optimise second" },
      {
        type: "p",
        text: "Streaming does not reduce total generation time, but it collapses perceived latency because the first token arrives in a few hundred milliseconds instead of several seconds. Server-sent events from FastAPI plus an incremental renderer on the client is usually the single highest-impact change you can make in an afternoon.",
      },
      {
        type: "code",
        lang: "python",
        code: `@router.post("/chat")\nasync def chat(payload: ChatRequest):\n    async def events():\n        async for chunk in llm.stream(payload.messages):\n            yield f"data: {chunk}\\n\\n"\n    return StreamingResponse(events(), media_type="text/event-stream")`,
      },
      { type: "h2", text: "2. Put a cache in front of determinism" },
      {
        type: "p",
        text: "A surprising share of production traffic is repeated: the same document summarised, the same FAQ asked, the same retrieval query issued. A Redis cache keyed on a normalised prompt hash plus model and temperature returns those in single-digit milliseconds.",
      },
      {
        type: "list",
        items: [
          "Normalise whitespace and casing before hashing so trivial differences still hit.",
          "Include model name, temperature and prompt version in the key — never cache across versions.",
          "Set a TTL that matches how quickly your source data changes, not an arbitrary day.",
        ],
      },
      { type: "h2", text: "3. Trim the prompt, not the quality" },
      {
        type: "p",
        text: "Long system prompts and unfiltered retrieval context inflate both latency and cost. Reranking retrieved chunks and keeping only the top few relevant passages usually improves answer quality while shrinking the payload — a rare change that wins on both axes.",
      },
      { type: "h2", text: "4. Parallelise the surrounding I/O" },
      {
        type: "p",
        text: "Retrieval, user context lookups, and tool calls are often independent. Running them concurrently with asyncio.gather instead of sequentially removed hundreds of milliseconds per request in my own services.",
      },
      { type: "h2", text: "5. Protect the tail" },
      {
        type: "p",
        text: "Add per-request timeouts, a bounded concurrency semaphore, and a fallback to a smaller model. Median latency looks fine without them; the 99th percentile is what users complain about.",
      },
      {
        type: "quote",
        text: "Measure end-to-end from the browser. Provider-reported latency hides queueing, retries and your own serialisation cost.",
      },
    ],
  },
  {
    slug: "architecture-of-an-ai-voice-agent",
    title: "The Architecture of a Production AI Voice Agent",
    description:
      "How a real-time voice automation system fits together: telephony, streaming speech-to-text, an LLM planner, tool calls, and text-to-speech under a strict latency budget.",
    date: "2026-05-02",
    readingTime: "8 min read",
    tags: ["Voice AI", "Realtime", "Architecture"],
    body: [
      {
        type: "p",
        text: "Voice is the least forgiving surface for AI. In chat, a two-second pause is unremarkable. On a phone call, it reads as a dropped line. Everything in the design below exists to defend a sub-second response budget while handling thousands of interactions a day.",
      },
      { type: "h2", text: "The pipeline" },
      {
        type: "list",
        items: [
          "Telephony layer receives the call and opens a bidirectional audio stream.",
          "Streaming speech-to-text emits partial transcripts continuously, not once at the end.",
          "A turn detector decides when the caller has actually finished speaking.",
          "The LLM planner interprets intent and decides whether to answer or call a tool.",
          "Tools hit internal APIs — bookings, CRM lookups, order status — behind strict timeouts.",
          "Text-to-speech streams audio back, ideally beginning before the full answer exists.",
        ],
      },
      { type: "h2", text: "Turn-taking is the hard part" },
      {
        type: "p",
        text: "Naive silence thresholds either interrupt people mid-sentence or leave dead air. Combining voice activity detection with partial-transcript stability, and allowing barge-in so the caller can cut off the agent, is what makes a call feel human.",
      },
      { type: "h2", text: "Budget every hop" },
      {
        type: "p",
        text: "Write down the target: transcription finalisation, planning, tool call, first synthesised audio. Instrument each hop separately. When a call feels slow, you should know which stage regressed without guessing.",
      },
      { type: "h2", text: "Design for failure out loud" },
      {
        type: "p",
        text: "If a tool times out, the agent should say something useful immediately rather than stall. Deterministic fallback phrases, retry-once semantics, and a clean human handoff path matter more than squeezing another point of model accuracy.",
      },
      { type: "h2", text: "Observability" },
      {
        type: "p",
        text: "Store the transcript, the tool calls with arguments, the latency per stage, and the outcome for every call. Almost every production improvement I have made to a voice system started with replaying a recorded conversation that went wrong.",
      },
    ],
  },
  {
    slug: "fastapi-patterns-for-scalable-backends",
    title: "FastAPI Patterns for Backends That Scale",
    description:
      "Dependency injection, connection pooling, background work, caching layers and observability patterns I reuse on every high-concurrency Python service.",
    date: "2026-03-24",
    readingTime: "6 min read",
    tags: ["FastAPI", "Python", "Backend"],
    body: [
      {
        type: "p",
        text: "FastAPI makes it easy to ship an endpoint quickly and just as easy to build something that falls over at real concurrency. These are the patterns I apply from day one instead of retrofitting later.",
      },
      { type: "h2", text: "Never block the event loop" },
      {
        type: "p",
        text: "One synchronous database driver or a CPU-heavy loop inside an async handler stalls every other request on that worker. Use async drivers, and push genuinely CPU-bound work to a thread pool or a separate worker process.",
      },
      { type: "h2", text: "Own your lifespan" },
      {
        type: "code",
        lang: "python",
        code: `@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    app.state.db = await create_pool(dsn, min_size=5, max_size=20)\n    app.state.redis = await redis_from_url(redis_url)\n    yield\n    await app.state.db.close()\n    await app.state.redis.close()`,
      },
      {
        type: "p",
        text: "Creating clients per request is one of the most common causes of connection exhaustion. Build pools once at startup and inject them through dependencies.",
      },
      { type: "h2", text: "Validate at the edge" },
      {
        type: "p",
        text: "Pydantic models on both request and response keep invalid data out of your domain logic and give you accurate OpenAPI docs for free. Response models also stop accidental leakage of internal fields.",
      },
      { type: "h2", text: "Move slow work off the request" },
      {
        type: "list",
        items: [
          "Emails, webhooks and report generation belong in a queue, not in the handler.",
          "Return an identifier the client can poll or subscribe to.",
          "Make every task idempotent so retries are safe.",
        ],
      },
      { type: "h2", text: "Make it observable before you need it" },
      {
        type: "p",
        text: "Structured JSON logs with a request ID, a /health endpoint that actually checks dependencies, and latency histograms per route. Debugging production without these is guesswork.",
      },
    ],
  },
  {
    slug: "rag-that-actually-works",
    title: "Building RAG That Actually Answers the Question",
    description:
      "Chunking, hybrid retrieval, reranking, grounded prompting and evaluation — the parts of retrieval-augmented generation that decide whether it works.",
    date: "2026-01-30",
    readingTime: "7 min read",
    tags: ["RAG", "LLM", "Retrieval"],
    body: [
      {
        type: "p",
        text: "A first RAG prototype takes a day. Making it reliably correct takes considerably longer, and almost all of that effort goes into retrieval quality rather than the generation step.",
      },
      { type: "h2", text: "Chunk along meaning" },
      {
        type: "p",
        text: "Fixed-size splits cut sentences and tables in half. Split on document structure — headings, sections, list boundaries — with a small overlap, and keep the source title and section path in each chunk's metadata so the model can cite precisely.",
      },
      { type: "h2", text: "Hybrid retrieval beats pure vectors" },
      {
        type: "p",
        text: "Embeddings handle paraphrase well but miss exact identifiers, error codes and product names. Combining dense search with keyword search, then fusing the ranked lists, consistently recalls more of the right context.",
      },
      { type: "h2", text: "Rerank before you generate" },
      {
        type: "p",
        text: "Retrieve generously, then use a cross-encoder to keep only the few genuinely relevant passages. Fewer, better chunks improve grounding and cut latency and cost at the same time.",
      },
      { type: "h2", text: "Constrain the answer" },
      {
        type: "p",
        text: "Instruct the model to answer only from the supplied context and to say plainly when the context is insufficient. Requiring citations makes hallucination visible instead of plausible.",
      },
      { type: "h2", text: "Evaluate continuously" },
      {
        type: "list",
        items: [
          "Keep a fixed set of real questions with expected sources.",
          "Track retrieval recall separately from answer quality — they fail for different reasons.",
          "Re-run the set on every prompt, chunking or model change before shipping it.",
        ],
      },
      {
        type: "quote",
        text: "If the right passage never reaches the prompt, no amount of prompt engineering will save the answer.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
