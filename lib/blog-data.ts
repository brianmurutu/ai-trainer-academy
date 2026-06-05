export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Guides" | "Research" | "Case Studies";
  readTime: string;
  date: string;
  author: string;
  authorTitle: string;
  authorInitials: string;
  tagColor: string;
  tagBg: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "guide-to-lora-tuning-parameters",
    title: "The Practical Guide to LoRA Fine-tuning Parameters",
    excerpt: "Demystifying rank (r), alpha, and target modules. Learn how to configure your adapters for optimal weight adaptation without VRAM blowup.",
    category: "Guides",
    readTime: "8 min read",
    date: "June 3, 2026",
    author: "Dr. Amara Osei",
    authorTitle: "LLM Fine-tuning Specialist",
    authorInitials: "AO",
    tagColor: "#6366F1",
    tagBg: "#EEF2FF",
    content: `
# The Practical Guide to LoRA Fine-tuning Parameters

When fine-tuning large language models, Low-Rank Adaptation (LoRA) is the go-to algorithm. It reduces the number of trainable parameters by inserting low-rank matrices into the attention layers, saving massive amounts of GPU memory.

However, configuring LoRA requires setting three critical parameters:
1. **Rank (r)**
2. **Alpha (scaling factor)**
3. **Target Modules**

In this post, we explain how to choose these settings to achieve state-of-the-art weights on your consumer hardware.

---

## 1. What is LoRA Rank (r)?

The rank parameter determines the width of the adapter matrices. A higher rank means more parameters are updated, allowing the model to learn more complex relationships. However, higher ranks also require more VRAM and increase the risk of overfitting.

* **Typical values:** 8, 16, 32, 64.
* **Our recommendation:** Use a rank of **16** for general domain training (like adapting a model to medical or legal text). Use **8** for style mimicking or simple classification tasks. Higher ranks (64+) are rarely needed unless you are teaching the model entirely new conceptual frameworks.

## 2. Choosing LoRA Alpha

LoRA Alpha is a scaling factor for the adapter weights. It acts like a learning rate multiplier for the low-rank updates.

* **Standard practice:** Set **alpha = 2 * r** (e.g., if rank is 16, set alpha to 32).
* **Why?** This maintains a stable scaling factor as you adjust the rank, preventing the update gradients from exploding or vanishing.

## 3. Target Modules

Target modules specify which weight matrices in the transformer block should receive adapter layers. In early implementations, adapters were only applied to query (\`q_proj\`) and value (\`v_proj\`) projections.

Modern research shows that applying adapters to all linear projection layers yields significantly higher performance:
* \`q_proj\`, \`k_proj\`, \`v_proj\`, \`o_proj\` (attention layers)
* \`gate_proj\`, \`up_proj\`, \`down_proj\` (feed-forward layers)

Although this increases parameter count slightly, it makes the fine-tuning process much more stable.
    `
  },
  {
    slug: "building-rag-vector-indexing-speed",
    title: "Optimizing Vector Indexing Speed in Production RAG",
    excerpt: "How to parse, chunk, and index millions of tokens in minutes. We compare HNSW vs IVF-Flat index configurations on Pgvector and Qdrant.",
    category: "Research",
    readTime: "12 min read",
    date: "May 25, 2026",
    author: "James Kariuki",
    authorTitle: "Senior MLOps Engineer",
    authorInitials: "JK",
    tagColor: "#3B82F6",
    tagBg: "#DBEAFE",
    content: `
# Optimizing Vector Indexing Speed in Production RAG

Deploying Retrieval-Augmented Generation (RAG) at scale requires deep optimization of vector index parameters. Simple indices work well on small datasets but become painfully slow as your corpus grows into millions of paragraphs.

In this research post, we analyze indexing benchmarks and compare different vector indexes.

---

## The Core Trade-off: Speed vs Recall

When querying a vector database, we search for the nearest neighbors to our query embedding. To do this quickly, databases build Approximate Nearest Neighbor (ANN) indices:

1. **HNSW (Hierarchical Navigable Small World):** Builds a multi-layer graph. Extremely fast queries, but high VRAM usage and slower build times.
2. **IVF (Inverted File Index):** Clusters vectors to narrow the search scope. Lower VRAM footprint and faster build times, but queries can have slightly lower recall.

### Benchmark Results

From our tests indexing 5 million chunks of domain-specific data:
* **HNSW (M=16, efConstruction=200):** Query latency of 3.2ms, recall accuracy of 98.4%. Indexing time: 4.2 hours.
* **IVF-PQ (nlist=1024, m=16):** Query latency of 8.5ms, recall accuracy of 92.1%. Indexing time: 1.1 hours. VRAM footprint was 70% lower than HNSW.

### Recommendation
For mission-critical applications where search accuracy is paramount (e.g. legal document discovery), absorb the VRAM cost and use **HNSW**. For customer support chatbots operating under tight budget constraints, **IVF-PQ** is a highly efficient alternative.
    `
  },
  {
    slug: "rlhf-constitutional-ai-alignment",
    title: "Understanding Constitutional AI and Alignment",
    excerpt: "How to use supervised critiques and revision loops instead of manual human reward annotators to align chat models with custom safety guidelines.",
    category: "Guides",
    readTime: "10 min read",
    date: "May 18, 2026",
    author: "Naledi Dlamini",
    authorTitle: "AI Safety Researcher",
    authorInitials: "ND",
    tagColor: "#059669",
    tagBg: "#D1FAE5",
    content: `
# Understanding Constitutional AI and Alignment

Traditional Reinforcement Learning from Human Feedback (RLHF) relies on massive teams of human labelers to rate model responses. This is expensive, slow, and hard to scale.

**Constitutional AI (CAI)**, popularized by Anthropic, replaces human annotators with an automated critique-and-revision loop governed by a set of written principles (the 'constitution').

---

## The Two Phases of Constitutional AI

CAI aligns models in two distinct phases:

### Phase 1: Supervised Learning (Critique & Revision)
1. The model is prompted to generate a response (which might contain harmful elements).
2. The model is then shown its response along with a rule from the constitution (e.g. 'Ensure the response is helpful, honest, and harmless') and asked to critique its own response.
3. Finally, the model is asked to revise its response based on the critique.
4. The revised responses are used to fine-tune the model in a supervised manner.

### Phase 2: Reinforcement Learning (RLAIF)
Instead of humans scoring response pairs, a critique model compares two outputs and selects the one that adheres closest to the constitution. The model's choices generate preference data used to train a Reward Model, which then guides the target model's training via reinforcement learning algorithms like PPO or DPO.
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
