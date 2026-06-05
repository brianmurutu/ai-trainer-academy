export type Lesson = {
  id: string;
  title: string;
  duration: string;
  isVideo?: boolean;
};

export type Section = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  trainer: string;
  trainerInitials: string;
  trainerTitle: string;
  trainerBio: string;
  trainerAvatar?: string;
  description: string;
  longDescription: string;
  priceUsd: number;
  priceKsh: number;
  rating: number;
  enrolledCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  whatYoullLearn: string[];
  prerequisites: string[];
  curriculum: Section[];
};

export const COURSES: Course[] = [
  {
    id: "1",
    slug: "llama-3-lora-tuning",
    title: "Fine-tuning LLaMA 3 with LoRA",
    trainer: "Dr. Amara Osei",
    trainerInitials: "AO",
    trainerTitle: "Lead AI Researcher at DeepTech Africa",
    trainerBio: "Amara holds a PhD in NLP and has spent 8+ years developing model architectures. She has helped open-source several African language models.",
    description: "Learn how to efficiently fine-tune LLaMA 3 models using Low-Rank Adaptation (LoRA) on custom datasets. Save compute while gaining state-of-the-art results.",
    longDescription: "Low-Rank Adaptation (LoRA) is the industry standard for tailoring large language models to custom tasks without spending tens of thousands of dollars on compute. In this course, you will learn the end-to-end process of preparing datasets, configuring model parameters, training, evaluating, and deploying fine-tuned LLaMA 3 weights. By the end of this course, you'll be able to design domain-specific models that rival much larger foundations at a fraction of the hardware cost.",
    priceUsd: 120,
    priceKsh: 15600,
    rating: 4.8,
    enrolledCount: 1240,
    level: "Advanced",
    duration: "12 hours",
    tag: "Fine-tuning",
    tagColor: "#6366F1",
    tagBg: "#EEF2FF",
    whatYoullLearn: [
      "Prepare and format custom datasets for fine-tuning",
      "Understand the mathematics behind Low-Rank Adaptation (LoRA)",
      "Configure PEFT (Parameter-Efficient Fine-Tuning) libraries",
      "Evaluate model performance before and after tuning",
      "Merge adapters with base weights and export to GGUF format"
    ],
    prerequisites: [
      "Solid Python programming knowledge",
      "Familiarity with PyTorch & Hugging Face ecosystem",
      "Basic understanding of neural network weights"
    ],
    curriculum: [
      {
        title: "Course Overview & Setup",
        lessons: [
          { id: "1-1", title: "Welcome & Learning Roadmap", duration: "10 mins", isVideo: true },
          { id: "1-2", title: "Setting up your Google Colab / Lambda Labs environment", duration: "15 mins", isVideo: false },
          { id: "1-3", title: "Introduction to LLaMA 3 Architecture", duration: "25 mins", isVideo: true }
        ]
      },
      {
        title: "Dataset Preparation & Curation",
        lessons: [
          { id: "1-4", title: "Structuring conversational datasets (ShareGPT vs Alpaca formats)", duration: "30 mins", isVideo: true },
          { id: "1-5", title: "Data cleaning, tokenization, and padding guidelines", duration: "25 mins", isVideo: true },
          { id: "1-6", title: "Lab: Preparing a custom Q&A dataset", duration: "45 mins", isVideo: false }
        ]
      },
      {
        title: "Understanding & Configuring LoRA",
        lessons: [
          { id: "1-7", title: "Under the hood: Attention weights and rank decomposition", duration: "40 mins", isVideo: true },
          { id: "1-8", title: "Choosing LoRA parameters: rank (r), alpha, target modules", duration: "20 mins", isVideo: true },
          { id: "1-9", title: "Configuring PEFT and TRL libraries in PyTorch", duration: "35 mins", isVideo: true }
        ]
      },
      {
        title: "Model Training & Optimization",
        lessons: [
          { id: "1-10", title: "Gradient accumulation, checkpointing, and precision (FP16/BF16)", duration: "30 mins", isVideo: true },
          { id: "1-11", title: "Monitoring loss curves with Weights & Biases", duration: "25 mins", isVideo: true },
          { id: "1-12", title: "Lab: Running the fine-tuning script on a single GPU", duration: "60 mins", isVideo: false }
        ]
      }
    ]
  },
  {
    id: "2",
    slug: "prompt-engineering-mastery",
    title: "Prompt Engineering Mastery",
    trainer: "Sana Malik",
    trainerInitials: "SM",
    trainerTitle: "AI Solution Architect & Consultant",
    trainerBio: "Sana designs commercial generative AI applications for Fortune 500 companies. She specializes in building multi-agent prompt pipelines.",
    description: "Go beyond basic prompting. Learn advanced systemic techniques like Chain-of-Thought, ReAct pattern, prompt template compilation, and security mitigations.",
    longDescription: "Prompting is not just typing questions; it is programming natural language engines. This course teaches you the systematic techniques required to build robust, predictable, and production-ready prompts. You'll master architectural frameworks like Chain-of-Thought (CoT), few-shot learning, tool calling orchestration, and prompt security techniques to prevent jailbreaking and indirect injections.",
    priceUsd: 45,
    priceKsh: 5850,
    rating: 4.9,
    enrolledCount: 3820,
    level: "Beginner",
    duration: "6 hours",
    tag: "Prompting",
    tagColor: "#059669",
    tagBg: "#D1FAE5",
    whatYoullLearn: [
      "Write predictable, production-ready system prompts",
      "Implement Chain-of-Thought (CoT) and Self-Consistency patterns",
      "Establish defensive prompts against prompt injection attacks",
      "Format structured outputs (JSON, XML) reliably from LLMs",
      "Build dynamic prompt template compilers in Node and Python"
    ],
    prerequisites: [
      "Basic understanding of chat interfaces (ChatGPT/Claude)",
      "General software development awareness (JSON format)"
    ],
    curriculum: [
      {
        title: "Introduction to Prompt Engineering",
        lessons: [
          { id: "2-1", title: "What is an LLM really doing?", duration: "12 mins", isVideo: true },
          { id: "2-2", title: "System vs User messages and Token limits", duration: "15 mins", isVideo: true },
          { id: "2-3", title: "Core elements of a perfect prompt", duration: "20 mins", isVideo: true }
        ]
      },
      {
        title: "Advanced Prompting Patterns",
        lessons: [
          { id: "2-4", title: "Few-Shot prompting and dynamic exemplar selection", duration: "25 mins", isVideo: true },
          { id: "2-5", title: "Chain-of-Thought (CoT) and Tree-of-Thought", duration: "30 mins", isVideo: true },
          { id: "2-6", title: "Structured outputs (JSON schema enforcing)", duration: "20 mins", isVideo: true }
        ]
      },
      {
        title: "Prompt Security & Validation",
        lessons: [
          { id: "2-7", title: "Understanding Jailbreaking & Injection vulnerabilities", duration: "22 mins", isVideo: true },
          { id: "2-8", title: "Defensive design and sandbox formatting", duration: "18 mins", isVideo: true },
          { id: "2-9", title: "Automated prompt testing & evaluation frameworks", duration: "30 mins", isVideo: false }
        ]
      }
    ]
  },
  {
    id: "3",
    slug: "rag-systems-vector-dbs",
    title: "RAG Systems & Vector Databases",
    trainer: "James Kariuki",
    trainerInitials: "JK",
    trainerTitle: "Senior MLOps Engineer at AI Lab Nairobi",
    trainerBio: "James designs data pipelines and scalable infrastructure for AI systems. He is an active contributor to LangChain and vector DB tools.",
    description: "Design production-ready Retrieval-Augmented Generation (RAG) pipelines. Master chunking strategies, vector index optimization, metadata filtering, and evaluation.",
    longDescription: "Deploying RAG in production is hard. Simple vector search often falls apart on real-world queries. This course covers advanced chunking techniques, hierarchical retrieval, query routing, hybrid search (combining dense vector with sparse BM25), metadata optimization, and evaluation frameworks like Ragas. You'll build a production-grade RAG agent that can fetch, parse, and reason over multi-page PDF documents.",
    priceUsd: 85,
    priceKsh: 11050,
    rating: 4.7,
    enrolledCount: 950,
    level: "Intermediate",
    duration: "10 hours",
    tag: "RAG / Dev",
    tagColor: "#3B82F6",
    tagBg: "#DBEAFE",
    whatYoullLearn: [
      "Implement smart document parsing and chunking strategies",
      "Optimize vector indexing (HNSW, Flat) for query speed and recall",
      "Build hybrid search engines (Semantic + Keyword search)",
      "Set up query rewriting, expansion, and re-ranking",
      "Evaluate RAG retrieval accuracy and response generation objectively"
    ],
    prerequisites: [
      "Intermediate Python knowledge",
      "Basic understanding of vector embeddings",
      "Access to an LLM provider API key (OpenAI/Anthropic)"
    ],
    curriculum: [
      {
        title: "RAG Fundamentals",
        lessons: [
          { id: "3-1", title: "The RAG architecture: Retrieval, Augmentation, Generation", duration: "15 mins", isVideo: true },
          { id: "3-2", title: "Limitations of native LLM context windows", duration: "10 mins", isVideo: true },
          { id: "3-3", title: "Choosing your vector database: Pinecone, Pgvector, Qdrant", duration: "25 mins", isVideo: true }
        ]
      },
      {
        title: "Ingestion and Processing Pipeline",
        lessons: [
          { id: "3-4", title: "Parsing complex documents: tables, headers, formatting", duration: "30 mins", isVideo: true },
          { id: "3-5", title: "Chunking strategies: recursive, sliding window, semantic", duration: "30 mins", isVideo: true },
          { id: "3-6", title: "Generating and storing vector embeddings", duration: "20 mins", isVideo: true }
        ]
      },
      {
        title: "Advanced Retrieval",
        lessons: [
          { id: "3-7", title: "Query expansion and rewriting algorithms", duration: "25 mins", isVideo: true },
          { id: "3-8", title: "Re-ranking search results with Cohere / BGE Re-rankers", duration: "20 mins", isVideo: true },
          { id: "3-9", title: "Metadata filtering and hybrid search setup", duration: "35 mins", isVideo: false }
        ]
      }
    ]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(c => c.id === id);
}
