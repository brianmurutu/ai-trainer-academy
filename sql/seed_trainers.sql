-- ============================================================
-- Trainer seed data
-- Run this against your Supabase project to populate the
-- trainers table with the 6 profiles shown on the home page.
--
-- Usage:
--   Supabase Dashboard → SQL Editor → Paste and Run
-- ============================================================

INSERT INTO trainers (
  slug, full_name, tagline, country,
  specialities, rating, review_count, sessions_completed,
  hourly_rate_ksh, hourly_rate_usd,
  available, featured,
  bio, avatar_url, linkedin_url, github_url
)
VALUES

-- 1. James Mwangi
(
  'james-mwangi',
  'James Mwangi',
  'Fine-tuning and RLHF specialist',
  'Kenya',
  ARRAY['Fine-tuning (LoRA / QLoRA)', 'RLHF & RLAIF', 'LLaMA', 'GPT-4'],
  4.9, 114, 128,
  2500, 20,
  true, true,
  'James is a Nairobi-based ML engineer with five years of hands-on experience fine-tuning large language models for production. He has worked on instruction-following datasets, RLHF pipelines, and custom adapter training for both open-source and proprietary models.',
  null,
  'https://linkedin.com/in/james-mwangi-ml',
  'https://github.com/james-mwangi-ml'
),

-- 2. Sofia Andersson
(
  'sofia-andersson',
  'Sofia Andersson',
  'Prompt Engineering specialist',
  'Sweden',
  ARRAY['Prompt Engineering', 'ChatGPT', 'Claude', 'Gemini'],
  4.8, 88, 94,
  2300, 18,
  true, true,
  'Sofia has designed prompt libraries and evaluation frameworks for enterprise teams across Europe. She specialises in systematic prompt development, chain-of-thought reasoning, and multi-turn conversation design.',
  null,
  'https://linkedin.com/in/sofia-andersson-ai',
  null
),

-- 3. Kofi Owusu
(
  'kofi-owusu',
  'Kofi Owusu',
  'Dataset Curation and Annotation expert',
  'Ghana',
  ARRAY['Dataset Curation & Annotation', 'JSONL', 'Hugging Face', 'Data Quality'],
  5.0, 59, 61,
  3000, 23,
  false, true,
  'Kofi has curated over 200,000 training examples for commercial LLMs and led annotation teams at two ML-focused startups. He teaches practical data quality workflows, inter-annotator agreement, and Hugging Face dataset tooling.',
  null,
  'https://linkedin.com/in/kofi-owusu-data',
  'https://github.com/kofi-owusu'
),

-- 4. Priya Rajan
(
  'priya-rajan',
  'Priya Rajan',
  'Model Evaluation and Benchmarking specialist',
  'India',
  ARRAY['Model Evaluation & Benchmarking', 'MMLU', 'Evals', 'Red-teaming'],
  4.7, 190, 203,
  2800, 22,
  true, true,
  'Priya leads model evaluation research at an independent AI safety group. She has published benchmark analysis on MMLU, HellaSwag, and custom domain-specific evaluation suites. Her sessions focus on rigorous, reproducible model assessment.',
  null,
  'https://linkedin.com/in/priya-rajan-evals',
  null
),

-- 5. David Kamau
(
  'david-kamau',
  'David Kamau',
  'LoRA and PEFT fine-tuning specialist',
  'Kenya',
  ARRAY['Fine-tuning (LoRA / QLoRA)', 'MLOps & Deployment', 'Adapters', 'QLoRA'],
  4.9, 82, 87,
  2000, 16,
  true, true,
  'David runs a machine learning consultancy in Nairobi and specialises in parameter-efficient fine-tuning. He has trained LoRA and QLoRA adapters for clients across fintech, legal, and healthcare domains, and teaches learners how to go from raw model to deployed endpoint.',
  null,
  null,
  'https://github.com/david-kamau-ml'
),

-- 6. Yuki Nakamura
(
  'yuki-nakamura',
  'Yuki Nakamura',
  'AI Safety and Alignment researcher',
  'Japan',
  ARRAY['AI Safety & Alignment', 'RLHF & RLAIF', 'Red-teaming', 'Alignment'],
  4.8, 43, 45,
  3500, 28,
  false, true,
  'Yuki is an alignment researcher who has contributed to red-teaming evaluations and constitutional AI experiments. Sessions cover alignment fundamentals, RLAIF techniques, and practical red-teaming methodologies for identifying failure modes in deployed models.',
  null,
  'https://linkedin.com/in/yuki-nakamura-alignment',
  'https://github.com/yuki-nakamura-ai'
)

ON CONFLICT (slug) DO UPDATE SET
  full_name           = EXCLUDED.full_name,
  tagline             = EXCLUDED.tagline,
  country             = EXCLUDED.country,
  specialities        = EXCLUDED.specialities,
  rating              = EXCLUDED.rating,
  review_count        = EXCLUDED.review_count,
  sessions_completed  = EXCLUDED.sessions_completed,
  hourly_rate_ksh     = EXCLUDED.hourly_rate_ksh,
  hourly_rate_usd     = EXCLUDED.hourly_rate_usd,
  available           = EXCLUDED.available,
  featured            = EXCLUDED.featured,
  bio                 = EXCLUDED.bio;
