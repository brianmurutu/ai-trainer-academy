-- ============================================================
-- 001_core_tables.sql
-- AI Trainer Academy - Core Tables + RLS Policies + Seed Data
-- ============================================================

-- ============================================================
-- TRAINERS
-- ============================================================
CREATE TABLE IF NOT EXISTS trainers (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  slug                text UNIQUE NOT NULL,
  full_name           text NOT NULL,
  tagline             text,
  country             text,
  specialities        text[] DEFAULT '{}',
  rating              numeric(3,2) DEFAULT 0,
  review_count        int DEFAULT 0,
  sessions_completed  int DEFAULT 0,
  hourly_rate_ksh     numeric DEFAULT 0,
  hourly_rate_usd     numeric DEFAULT 0,
  available           boolean DEFAULT true,
  featured            boolean DEFAULT false,
  bio                 text,
  linkedin_url        text,
  github_url          text,
  avatar_url          text,
  approved_at         timestamptz,
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

-- Anyone can read trainers
CREATE POLICY "trainers_public_read" ON trainers
  FOR SELECT USING (true);

-- Only the trainer themselves (or service role) can update their own row
CREATE POLICY "trainers_owner_update" ON trainers
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text UNIQUE NOT NULL,
  title               text NOT NULL,
  trainer_id          uuid REFERENCES trainers(id) ON DELETE SET NULL,
  trainer_name        text,
  trainer_initials    text,
  trainer_title       text,
  trainer_bio         text,
  description         text,
  long_description    text,
  price_usd           numeric DEFAULT 0,
  price_ksh           numeric DEFAULT 0,
  rating              numeric(3,2) DEFAULT 0,
  enrolled_count      int DEFAULT 0,
  level               text,
  duration            text,
  tag                 text,
  tag_color           text,
  tag_bg              text,
  what_youll_learn    text[] DEFAULT '{}',
  prerequisites       text[] DEFAULT '{}',
  curriculum          jsonb DEFAULT '[]',
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Anyone can read courses
CREATE POLICY "courses_public_read" ON courses
  FOR SELECT USING (true);

-- ============================================================
-- BOOKINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id            uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  trainer_id            uuid REFERENCES trainers(id) ON DELETE SET NULL,
  course_id             uuid REFERENCES courses(id) ON DELETE SET NULL,
  paystack_reference    text UNIQUE,
  binance_trade_no      text UNIQUE,
  amount_ksh            numeric DEFAULT 0,
  amount_usd            numeric DEFAULT 0,
  currency              text DEFAULT 'KES',
  payment_method        text DEFAULT 'paystack',
  status                text DEFAULT 'pending',
  session_date          timestamptz,
  session_duration_hrs  numeric DEFAULT 1,
  session_topic         text,
  created_at            timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Learners can read/insert their own bookings
CREATE POLICY "bookings_learner_read" ON bookings
  FOR SELECT USING (auth.uid() = learner_id);

CREATE POLICY "bookings_learner_insert" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = learner_id);

-- Trainers can read bookings where they are the trainer
CREATE POLICY "bookings_trainer_read" ON bookings
  FOR SELECT USING (
    trainer_id IN (
      SELECT id FROM trainers WHERE user_id = auth.uid()
    )
  );

-- ============================================================
-- ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id          uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id           uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress_pct        int DEFAULT 0,
  completed_lessons   text[] DEFAULT '{}',
  completed_at        timestamptz,
  created_at          timestamptz DEFAULT now(),
  UNIQUE(learner_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Learners can read/write only their own enrollments
CREATE POLICY "enrollments_learner_read" ON enrollments
  FOR SELECT USING (auth.uid() = learner_id);

CREATE POLICY "enrollments_learner_insert" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = learner_id);

CREATE POLICY "enrollments_learner_update" ON enrollments
  FOR UPDATE USING (auth.uid() = learner_id);

-- ============================================================
-- SEED DATA: TRAINERS
-- (Matches the 6 trainers from components/Trainers.tsx and app/trainers/page.tsx)
-- ============================================================
INSERT INTO trainers (slug, full_name, tagline, country, specialities, rating, review_count, sessions_completed, hourly_rate_ksh, hourly_rate_usd, available, featured)
VALUES
  (
    'dr-amara-osei',
    'Dr. Amara Osei',
    'LLM Fine-tuning Specialist - PhD in ML from UCT',
    'Ghana',
    ARRAY['Fine-tuning', 'LoRA / QLoRA', 'RLHF', 'Dataset Curation'],
    4.9, 143, 328, 3500, 26.92, true, true
  ),
  (
    'naledi-dlamini',
    'Naledi Dlamini',
    'AI Safety Researcher and RLHF Engineer',
    'South Africa',
    ARRAY['AI Safety', 'RLHF', 'Model Evaluation', 'Multimodal'],
    4.9, 98, 189, 4200, 32.31, true, true
  ),
  (
    'james-kariuki',
    'James Kariuki',
    'RAG Systems and Vector Database Architect',
    'Kenya',
    ARRAY['RAG Systems', 'Vector DBs', 'LangChain', 'Production ML'],
    4.8, 76, 214, 3000, 23.08, true, false
  ),
  (
    'sana-malik',
    'Sana Malik',
    'Prompt Engineer and LLM Application Developer',
    'Nigeria',
    ARRAY['Prompt Engineering', 'LLM APIs', 'Agents and Tools', 'OpenAI'],
    4.8, 112, 301, 2500, 19.23, false, false
  ),
  (
    'tafadzwa-moyo',
    'Tafadzwa Moyo',
    'Computer Vision and Multimodal ML Expert',
    'Zimbabwe',
    ARRAY['Computer Vision', 'Diffusion Models', 'Vision-Language', 'PyTorch'],
    4.7, 54, 143, 3200, 24.62, true, false
  ),
  (
    'chioma-eze',
    'Chioma Eze',
    'MLOps and Production AI Infrastructure',
    'Nigeria',
    ARRAY['MLOps', 'Model Deployment', 'Kubernetes', 'Monitoring'],
    4.8, 67, 178, 2800, 21.54, true, false
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA: COURSES
-- (Matches the 3 courses from lib/courses-data.ts)
-- ============================================================
INSERT INTO courses (
  slug, title, trainer_name, trainer_initials, trainer_title, trainer_bio,
  description, long_description,
  price_usd, price_ksh, rating, enrolled_count, level, duration,
  tag, tag_color, tag_bg,
  what_youll_learn, prerequisites, curriculum
)
VALUES
  (
    'llama-3-lora-tuning',
    'Fine-tuning LLaMA 3 with LoRA',
    'Dr. Amara Osei',
    'AO',
    'Lead AI Researcher at DeepTech Africa',
    'Amara holds a PhD in NLP and has spent 8+ years developing model architectures. She has helped open-source several African language models.',
    'Learn how to efficiently fine-tune LLaMA 3 models using Low-Rank Adaptation (LoRA) on custom datasets. Save compute while gaining state-of-the-art results.',
    'Low-Rank Adaptation (LoRA) is the industry standard for tailoring large language models to custom tasks without spending tens of thousands of dollars on compute. In this course, you will learn the end-to-end process of preparing datasets, configuring model parameters, training, evaluating, and deploying fine-tuned LLaMA 3 weights. By the end of this course, you will be able to design domain-specific models that rival much larger foundations at a fraction of the hardware cost.',
    120, 15600, 4.8, 1240, 'Advanced', '12 hours',
    'Fine-tuning', '#6366F1', '#EEF2FF',
    ARRAY[
      'Prepare and format custom datasets for fine-tuning',
      'Understand the mathematics behind Low-Rank Adaptation (LoRA)',
      'Configure PEFT (Parameter-Efficient Fine-Tuning) libraries',
      'Evaluate model performance before and after tuning',
      'Merge adapters with base weights and export to GGUF format'
    ],
    ARRAY[
      'Solid Python programming knowledge',
      'Familiarity with PyTorch and Hugging Face ecosystem',
      'Basic understanding of neural network weights'
    ],
    '[{"title":"Course Overview and Setup","lessons":[{"id":"1-1","title":"Welcome and Learning Roadmap","duration":"10 mins","isVideo":true},{"id":"1-2","title":"Setting up your Google Colab / Lambda Labs environment","duration":"15 mins","isVideo":false},{"id":"1-3","title":"Introduction to LLaMA 3 Architecture","duration":"25 mins","isVideo":true}]},{"title":"Dataset Preparation and Curation","lessons":[{"id":"1-4","title":"Structuring conversational datasets (ShareGPT vs Alpaca formats)","duration":"30 mins","isVideo":true},{"id":"1-5","title":"Data cleaning, tokenization, and padding guidelines","duration":"25 mins","isVideo":true},{"id":"1-6","title":"Lab: Preparing a custom Q&A dataset","duration":"45 mins","isVideo":false}]},{"title":"Understanding and Configuring LoRA","lessons":[{"id":"1-7","title":"Under the hood: Attention weights and rank decomposition","duration":"40 mins","isVideo":true},{"id":"1-8","title":"Choosing LoRA parameters: rank (r), alpha, target modules","duration":"20 mins","isVideo":true},{"id":"1-9","title":"Configuring PEFT and TRL libraries in PyTorch","duration":"35 mins","isVideo":true}]},{"title":"Model Training and Optimization","lessons":[{"id":"1-10","title":"Gradient accumulation, checkpointing, and precision (FP16/BF16)","duration":"30 mins","isVideo":true},{"id":"1-11","title":"Monitoring loss curves with Weights and Biases","duration":"25 mins","isVideo":true},{"id":"1-12","title":"Lab: Running the fine-tuning script on a single GPU","duration":"60 mins","isVideo":false}]}]'::jsonb
  ),
  (
    'prompt-engineering-mastery',
    'Prompt Engineering Mastery',
    'Sana Malik',
    'SM',
    'AI Solution Architect and Consultant',
    'Sana designs commercial generative AI applications for Fortune 500 companies. She specializes in building multi-agent prompt pipelines.',
    'Go beyond basic prompting. Learn advanced systemic techniques like Chain-of-Thought, ReAct pattern, prompt template compilation, and security mitigations.',
    'Prompting is not just typing questions; it is programming natural language engines. This course teaches you the systematic techniques required to build robust, predictable, and production-ready prompts. You will master architectural frameworks like Chain-of-Thought (CoT), few-shot learning, tool calling orchestration, and prompt security techniques to prevent jailbreaking and indirect injections.',
    45, 5850, 4.9, 3820, 'Beginner', '6 hours',
    'Prompting', '#059669', '#D1FAE5',
    ARRAY[
      'Write predictable, production-ready system prompts',
      'Implement Chain-of-Thought (CoT) and Self-Consistency patterns',
      'Establish defensive prompts against prompt injection attacks',
      'Format structured outputs (JSON, XML) reliably from LLMs',
      'Build dynamic prompt template compilers in Node and Python'
    ],
    ARRAY[
      'Basic understanding of chat interfaces (ChatGPT/Claude)',
      'General software development awareness (JSON format)'
    ],
    '[{"title":"Introduction to Prompt Engineering","lessons":[{"id":"2-1","title":"What is an LLM really doing?","duration":"12 mins","isVideo":true},{"id":"2-2","title":"System vs User messages and Token limits","duration":"15 mins","isVideo":true},{"id":"2-3","title":"Core elements of a perfect prompt","duration":"20 mins","isVideo":true}]},{"title":"Advanced Prompting Patterns","lessons":[{"id":"2-4","title":"Few-Shot prompting and dynamic exemplar selection","duration":"25 mins","isVideo":true},{"id":"2-5","title":"Chain-of-Thought (CoT) and Tree-of-Thought","duration":"30 mins","isVideo":true},{"id":"2-6","title":"Structured outputs (JSON schema enforcing)","duration":"20 mins","isVideo":true}]},{"title":"Prompt Security and Validation","lessons":[{"id":"2-7","title":"Understanding Jailbreaking and Injection vulnerabilities","duration":"22 mins","isVideo":true},{"id":"2-8","title":"Defensive design and sandbox formatting","duration":"18 mins","isVideo":true},{"id":"2-9","title":"Automated prompt testing and evaluation frameworks","duration":"30 mins","isVideo":false}]}]'::jsonb
  ),
  (
    'rag-systems-vector-dbs',
    'RAG Systems and Vector Databases',
    'James Kariuki',
    'JK',
    'Senior MLOps Engineer at AI Lab Nairobi',
    'James designs data pipelines and scalable infrastructure for AI systems. He is an active contributor to LangChain and vector DB tools.',
    'Design production-ready Retrieval-Augmented Generation (RAG) pipelines. Master chunking strategies, vector index optimization, metadata filtering, and evaluation.',
    'Deploying RAG in production is hard. Simple vector search often falls apart on real-world queries. This course covers advanced chunking techniques, hierarchical retrieval, query routing, hybrid search (combining dense vector with sparse BM25), metadata optimization, and evaluation frameworks like Ragas. You will build a production-grade RAG agent that can fetch, parse, and reason over multi-page PDF documents.',
    85, 11050, 4.7, 950, 'Intermediate', '10 hours',
    'RAG / Dev', '#3B82F6', '#DBEAFE',
    ARRAY[
      'Implement smart document parsing and chunking strategies',
      'Optimize vector indexing (HNSW, Flat) for query speed and recall',
      'Build hybrid search engines (Semantic + Keyword search)',
      'Set up query rewriting, expansion, and re-ranking',
      'Evaluate RAG retrieval accuracy and response generation objectively'
    ],
    ARRAY[
      'Intermediate Python knowledge',
      'Basic understanding of vector embeddings',
      'Access to an LLM provider API key (OpenAI/Anthropic)'
    ],
    '[{"title":"RAG Fundamentals","lessons":[{"id":"3-1","title":"The RAG architecture: Retrieval, Augmentation, Generation","duration":"15 mins","isVideo":true},{"id":"3-2","title":"Limitations of native LLM context windows","duration":"10 mins","isVideo":true},{"id":"3-3","title":"Choosing your vector database: Pinecone, Pgvector, Qdrant","duration":"25 mins","isVideo":true}]},{"title":"Ingestion and Processing Pipeline","lessons":[{"id":"3-4","title":"Parsing complex documents: tables, headers, formatting","duration":"30 mins","isVideo":true},{"id":"3-5","title":"Chunking strategies: recursive, sliding window, semantic","duration":"30 mins","isVideo":true},{"id":"3-6","title":"Generating and storing vector embeddings","duration":"20 mins","isVideo":true}]},{"title":"Advanced Retrieval","lessons":[{"id":"3-7","title":"Query expansion and rewriting algorithms","duration":"25 mins","isVideo":true},{"id":"3-8","title":"Re-ranking search results with Cohere / BGE Re-rankers","duration":"20 mins","isVideo":true},{"id":"3-9","title":"Metadata filtering and hybrid search setup","duration":"35 mins","isVideo":false}]}]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;
