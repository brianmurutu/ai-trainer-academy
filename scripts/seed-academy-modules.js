const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

if (fs.existsSync(".env.local")) {
  fs.readFileSync(".env.local", "utf8").split("\n").forEach(line => {
    const [key, ...val] = line.split("=");
    if (key && val.length > 0) {
      process.env[key.trim()] = val.join("=").trim();
    }
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const modules = [
  {
    slug: "how-ai-training-jobs-work",
    title: "How AI Training Jobs Work",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Find out what AI annotation is, what the work looks like day-to-day, what separates people who get consistent work from people who don't, and how to figure out which income tier you can target.",
    long_description: "This module covers the core business model of AI training. You will learn about reinforcement learning from human feedback (RLHF), standard compensation models, and how to position yourself for high-paying gigs.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 3450,
    level: "Beginner",
    duration: "20 minutes",
    tag: "Academy",
    tag_color: "#1A6FBF",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Understand RLHF and prompt engineering platforms",
      "Identify the daily routine of a model trainer",
      "Determine income tiers and platform expectations"
    ],
    prerequisites: ["None. Complete beginner friendly."],
    curriculum: [
      {
        title: "Introduction",
        lessons: [
          { id: "f1-l1", title: "Welcome to AI Training", duration: "5 min", isVideo: false },
          { id: "f1-l2", title: "The Business of RLHF", duration: "8 min", isVideo: false },
          { id: "f1-l3", title: "Annotation Tiers & Income", duration: "7 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "passing-the-screening-process",
    title: "Passing the Screening Process",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Most candidates fail screening not because they lack the skills, but because they don't know what is being tested. This module breaks down every stage, the most common failure modes at each, and how to prepare for the real thing.",
    long_description: "Learn how to pass onboarding trials on platforms like Outlier, Alignerr, and DataAnnotation. We analyze actual test formats, common traps, and quality guidelines.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.9,
    enrolled_count: 2900,
    level: "Beginner",
    duration: "25 minutes",
    tag: "Academy",
    tag_color: "#1A7A4A",
    tag_bg: "#E8F5EE",
    what_youll_learn: [
      "Understand trial task guidelines",
      "Avoid common screening failure traps",
      "Replicate the scoring rubrics used by recruiters"
    ],
    prerequisites: ["Module F1: How AI Training Jobs Work"],
    curriculum: [
      {
        title: "Screening Insights",
        lessons: [
          { id: "f2-l1", title: "Recruiter Trial Mechanics", duration: "8 min", isVideo: false },
          { id: "f2-l2", title: "Top 5 Screening Traps", duration: "10 min", isVideo: false },
          { id: "f2-l3", title: "Preparation Checklist", duration: "7 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "your-first-annotation-task",
    title: "Your First Annotation Task",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Walk through a complete pairwise comparison task step by step. By the end you've made a real annotation decision, written a rationale, and know what quality means in practice.",
    long_description: "An interactive, practical guide simulating your first day as an annotator. Walk through choosing between two responses, justifying the preference, and formatting annotations.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.7,
    enrolled_count: 2150,
    level: "Beginner",
    duration: "30 minutes",
    tag: "Academy",
    tag_color: "#1A6FBF",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Conduct a pairwise comparison between model outputs",
      "Write a defensible tie-break rationale",
      "Utilize standard markup to highlight errors"
    ],
    prerequisites: ["Module F2: Passing the Screening Process"],
    curriculum: [
      {
        title: "Annotation Sandbox",
        lessons: [
          { id: "f3-l1", title: "Anatomy of Pairwise Tasks", duration: "10 min", isVideo: false },
          { id: "f3-l2", title: "Writing Professional Rubrics", duration: "10 min", isVideo: false },
          { id: "f3-l3", title: "Task Review & Critique", duration: "10 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "foundations-of-rlhf",
    title: "Foundations of RLHF",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Understand the full RLHF pipeline — from pretraining to PPO — and learn exactly what annotators do, why quality signals matter, and how your feedback shapes model behavior.",
    long_description: "Deep dive into Reinforcement Learning from Human Feedback (RLHF). Learn the math and mechanisms (PPO, reward models) that turn raw LLMs into helpful assistants.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 1800,
    level: "Beginner",
    duration: "30 minutes",
    tag: "Academy",
    tag_color: "#B05C0E",
    tag_bg: "#FDF0E4",
    what_youll_learn: [
      "Identify pretraining vs fine-tuning stages",
      "Explain the purpose of reward modeling",
      "Trace how annotation errors degrade PPO alignment"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "RLHF Mechanics",
        lessons: [
          { id: "f4-l1", title: "Pretraining & SFT", duration: "10 min", isVideo: false },
          { id: "f4-l2", title: "The Reward Model", duration: "10 min", isVideo: false },
          { id: "f4-l3", title: "Policy Optimization (PPO)", duration: "10 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "ground-truth-research-method",
    title: "Ground Truth Research Method",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn how to research claims rigorously, build verifiable rationales with primary sources, and meet the evidence standards required for high-paying expert reviewer roles.",
    long_description: "This intermediate module teaches you scientific and factual auditing. Learn how to track down citations, handle conflicting claims, and prove model hallucinations.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.9,
    enrolled_count: 1420,
    level: "Intermediate",
    duration: "1 hour",
    tag: "Academy",
    tag_color: "#1A6FBF",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Isolate testable claims in LLM outputs",
      "Evaluate primary source credibility",
      "Structure ground-truth proof folders"
    ],
    prerequisites: ["Module F3: Your First Annotation Task"],
    curriculum: [
      {
        title: "Research Syllabus",
        lessons: [
          { id: "f5-l1", title: "Factual Claim Auditing", duration: "15 min", isVideo: false },
          { id: "f5-l2", title: "Primary Source Verification", duration: "25 min", isVideo: false },
          { id: "f5-l3", title: "Drafting the Truth Report", duration: "20 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "advanced-instruction-following",
    title: "Advanced Instruction Following",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Master the skill of parsing complex, multi-part instructions, handling constraint conflicts, and evaluating whether AI responses genuinely follow instructions or only appear to.",
    long_description: "Instruction following is the highest correlation to annotation pay. Learn how to trace and verify complex nested constraints (negative constraints, word limits, formatting).",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 1350,
    level: "Intermediate",
    duration: "1.5 hours",
    tag: "Academy",
    tag_color: "#1A2E42",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Audit nested constraints in complex prompts",
      "Verify negative constraints systematically",
      "Score instruction compliance percentage"
    ],
    prerequisites: ["Module F3"],
    curriculum: [
      {
        title: "Constraint Mastery",
        lessons: [
          { id: "f6-l1", title: "Constraint Isolation", duration: "30 min", isVideo: false },
          { id: "f6-l2", title: "Negative & Form Constraints", duration: "30 min", isVideo: false },
          { id: "f6-l3", title: "Complex Rubric Scoring", duration: "30 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "markdown-and-json-formatting-mastery",
    title: "Markdown & JSON Formatting Mastery",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn the formatting standards that AI training platforms enforce: proper Markdown, valid JSON, structured outputs for tool use. Discover how formatting errors degrade model training.",
    long_description: "Formatting errors trigger automated rejections on most platforms. Learn how to write syntax-perfect Markdown, valid JSON trees, and escape characters correctly.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.7,
    enrolled_count: 1100,
    level: "Intermediate",
    duration: "1 hour",
    tag: "Academy",
    tag_color: "#243D54",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Write clean GFM Markdown formatting",
      "Build and validate nested JSON schemas",
      "Format function-calling outputs correctly"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Syntax Syllabus",
        lessons: [
          { id: "f7-l1", title: "GFM Markdown Standards", duration: "20 min", isVideo: false },
          { id: "f7-l2", title: "JSON Structure & Syntax", duration: "25 min", isVideo: false },
          { id: "f7-l3", title: "Tool Call Outputs", duration: "15 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "safety-and-content-policy",
    title: "Safety & Content Policy Triage",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn when an AI must refuse, when it must help, and how to catch the error no annotator can afford to miss — the over-flag. Master the triage judgment that separates trusted reviewers from suspended accounts.",
    long_description: "Master safety triage. Learn to judge safety threats (harassment, dangerous content) without over-blocking harmless queries (educational, fictional context).",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.9,
    enrolled_count: 980,
    level: "Beginner",
    duration: "45 minutes",
    tag: "Academy",
    tag_color: "#E11D48",
    tag_bg: "#FFE4E6",
    what_youll_learn: [
      "Calibrate refusal boundaries for safe prompts",
      "Avoid the costly over-flag mistake",
      "Structure safety reasoning rubrics"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Safety Syllabus",
        lessons: [
          { id: "c4-l1", title: "Refusal vs Compliance Bounds", duration: "15 min", isVideo: false },
          { id: "c4-l2", title: "The Over-Flag Mistake", duration: "15 min", isVideo: false },
          { id: "c4-l3", title: "Triage Scenarios Walkthrough", duration: "15 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "final-practice-simulation",
    title: "Final Practice: Full Task Simulation",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Zero theory. Ten unguided, high-fidelity tasks covering every skill in the Core curriculum — hallucination hunting, constraint parsing, safety triage, ground truth verification, JSON auditing, tone evaluation, and multi-constraint judgment.",
    long_description: "An intensive capstone simulator with ten real tasks. Practice evaluation, feedback rubric generation, and final submission audits in real task environments.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 750,
    level: "Intermediate",
    duration: "1.5 hours",
    tag: "Academy",
    tag_color: "#B05C0E",
    tag_bg: "#FDF0E4",
    what_youll_learn: [
      "Audit high-fidelity simulated tasks",
      "Submit comprehensive, detailed reviews",
      "Operate under standard trial task time pressure"
    ],
    prerequisites: ["Modules F1-F7, C4"],
    curriculum: [
      {
        title: "Task Simulator",
        lessons: [
          { id: "c6-l1", title: "Practice Setup & Workspace", duration: "10 min", isVideo: false },
          { id: "c6-l2", title: "Core Simulation Phase 1 (5 Tasks)", duration: "40 min", isVideo: false },
          { id: "c6-l3", title: "Core Simulation Phase 2 (5 Tasks)", duration: "40 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "python-for-ai-training",
    title: "Python for AI Training",
    image_url: "/images/course-technical.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn what coding interview tasks and code review sessions test: correctness, complexity, edge cases, and style. Discover how to evaluate AI-generated Python as a professional annotator.",
    long_description: "Learn how to evaluate AI-generated code. Covers algorithmic complexity, edge cases, PEP8 compliance, test suite execution, and pythonic standards.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 890,
    level: "Intermediate",
    duration: "2 hours",
    tag: "Academy",
    tag_color: "#1A6FBF",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Judge algorithm correctness & runtime complexity",
      "Write clean testing fixtures to verify code",
      "Audit pythonic styling conventions"
    ],
    prerequisites: ["Basic Python programming background"],
    curriculum: [
      {
        title: "Algorithmic Review",
        lessons: [
          { id: "t1-l1", title: "Code Correctness Auditing", duration: "30 min", isVideo: false },
          { id: "t1-l2", title: "Complexity & Edge Cases", duration: "45 min", isVideo: false },
          { id: "t1-l3", title: "Formatting & Refactoring", duration: "45 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "sql-and-data-handling",
    title: "SQL & Data Handling",
    image_url: "/images/course-technical.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Build the SQL and data reasoning skills needed to evaluate AI-generated queries, spot logic errors in data analysis, and succeed in data science interview tasks.",
    long_description: "Learn how to review query execution plans, identify database logic errors (JOIN problems, aggregates), and structure data analysis tasks.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.7,
    enrolled_count: 620,
    level: "Intermediate",
    duration: "1.5 hours",
    tag: "Academy",
    tag_color: "#1A2E42",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Detect logic flaws in SQL JOINs and aggregates",
      "Trace query execution efficiency",
      "Format structured data tables for datasets"
    ],
    prerequisites: ["Basic SQL syntax familiarity"],
    curriculum: [
      {
        title: "SQL Syllabus",
        lessons: [
          { id: "t2-l1", title: "SQL Logic Flaw Hunting", duration: "30 min", isVideo: false },
          { id: "t2-l2", title: "Aggregations & Subqueries", duration: "30 min", isVideo: false },
          { id: "t2-l3", title: "Structured Data Formats", duration: "30 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "creative-writing-and-style-guide-adherence",
    title: "Creative Writing & Style Guide Adherence",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn what creative writing tasks in AI training require: style guide adherence, prompt engineering, brainstorming quality, red teaming for creative content, and what writing interviewers look for.",
    long_description: "Specialized path for humanities and creative writing. Learn style constraints, tone tuning, formatting, and red-teaming for storytelling quality.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.8,
    enrolled_count: 510,
    level: "Intermediate",
    duration: "2 hours",
    tag: "Academy",
    tag_color: "#B05C0E",
    tag_bg: "#FDF0E4",
    what_youll_learn: [
      "Enforce style guide conventions strictly",
      "Evaluate tone, pacing, and vocabulary choices",
      "Audit brainstorming suggestions for originality"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Creative Syllabus",
        lessons: [
          { id: "cw1-l1", title: "Tone & Voice Calibration", duration: "40 min", isVideo: false },
          { id: "cw1-l2", title: "Constraint Adherence", duration: "40 min", isVideo: false },
          { id: "cw1-l3", title: "Originality & Pacing", duration: "40 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "medical-scribing-and-hipaa-for-ai",
    title: "Medical Scribing & HIPAA for AI",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Understand clinical case study format, core medical terminology, HIPAA's implications for AI training data, and how to evaluate AI medical responses against provided sources — even without a clinical background.",
    long_description: "Specialized expert track. Learn HIPAA privacy guidelines, medical annotation formatting, and clinical case note summaries.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.9,
    enrolled_count: 420,
    level: "Advanced",
    duration: "2 hours",
    tag: "Academy",
    tag_color: "#1A7A4A",
    tag_bg: "#E8F5EE",
    what_youll_learn: [
      "Anonymize patient data in compliance with HIPAA",
      "Structure clinical soap notes correctly",
      "Verify drug names, doses, and medical abbreviations"
    ],
    prerequisites: ["Medical or clinical background recommended"],
    curriculum: [
      {
        title: "Medical Syllabus",
        lessons: [
          { id: "med1-l1", title: "HIPAA Data Anonymization", duration: "40 min", isVideo: false },
          { id: "med1-l2", title: "SOAP Note Structuring", duration: "40 min", isVideo: false },
          { id: "med1-l3", title: "Medical Claim Auditing", duration: "40 min", isVideo: false }
        ]
      }
    ]
  },
  {
    slug: "stem-and-latex-math-solving",
    title: "STEM & LaTeX (Math Solving)",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn to write and evaluate mathematical reasoning with LaTeX, verify AI-generated STEM solutions step by step, and understand what olympiad-level and quantitative reasoning tasks require.",
    long_description: "Specialized expert track for mathematicians and scientists. Learn step-by-step mathematical proof audits, LaTeX format syntax, and logic validation.",
    price_usd: 0,
    price_ksh: 0,
    rating: 4.9,
    enrolled_count: 380,
    level: "Advanced",
    duration: "2.5 hours",
    tag: "Academy",
    tag_color: "#1A6FBF",
    tag_bg: "#EBF3FC",
    what_youll_learn: [
      "Format mathematical equations perfectly in LaTeX",
      "Trace logic derivations step by step",
      "Audit olympiad-level math prompts"
    ],
    prerequisites: ["STEM or advanced mathematics background"],
    curriculum: [
      {
        title: "STEM Syllabus",
        lessons: [
          { id: "stem1-l1", title: "LaTeX Equation Syntax", duration: "50 min", isVideo: false },
          { id: "stem1-l2", title: "Proof Logic Auditing", duration: "50 min", isVideo: false },
          { id: "stem1-l3", title: "STEM Case Audits", duration: "50 min", isVideo: false }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Seeding AI Trainer Academy modules as courses in the database...");
  for (const m of modules) {
    console.log(`Upserting course: ${m.title} (${m.slug})...`);
    const { data, error } = await supabase
      .from("courses")
      .upsert(m, { onConflict: "slug" })
      .select("id");

    if (error) {
      console.error(`Error upserting ${m.slug}:`, error.message);
    } else {
      console.log(`Successfully upserted: ${m.title} with ID ${data[0].id}`);
    }
  }
  console.log("Done!");
}

seed();
