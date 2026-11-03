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

// Slugs of old scraped modules that need to be completely deleted to resolve copyright claims
const oldSlugs = [
  "how-ai-training-jobs-work",
  "passing-the-screening-process",
  "your-first-annotation-task",
  "foundations-of-rlhf",
  "ground-truth-research-method",
  "advanced-instruction-following",
  "markdown-and-json-formatting-mastery",
  "safety-and-content-policy",
  "final-practice-simulation",
  "python-for-ai-training",
  "sql-and-data-handling",
  "creative-writing-and-style-guide-adherence",
  "medical-scribing-and-hipaa-for-ai",
  "stem-and-latex-math-solving"
];

const newModules = [
  {
    slug: "intro-ai-training-optimization",
    title: "Introduction to AI Training and Optimization",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn how human annotation and dataset curation drive reinforcement learning, and explore annotation grading systems, daily workflows, and career paths.",
    long_description: "This module serves as the entry point into the professional AI training field. We break down the structural workflow of reinforcement learning from human feedback (RLHF), standard compensation models, and what platform reviewers check for during daily audits.",
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
      "Understand the mechanics of model fine-tuning and optimization",
      "Identify the daily routine and best practices of a model trainer",
      "Determine income tiers and platform expectations"
    ],
    prerequisites: ["None. Complete beginner friendly."],
    curriculum: [
      {
        title: "Introduction",
        lessons: [
          {
            id: "intro-ai-l1",
            title: "Welcome to AI Training & Optimization",
            duration: "20 min",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Introduction to AI Model Training</h2>
                <p>Welcome to the AI Trainer Academy. Before diving into technical guidelines, it is crucial to understand the purpose of your role. AI trainers do not simply write text; they act as optimization specialists who align Large Language Models (LLMs) with human intent, safety guidelines, and factual accuracy.</p>
                
                <div class="academy-callout">
                  <p><strong>Core Concept:</strong> AI model training is the bridge between raw pre-trained algorithms and helpful, safe, and factual assistants like ChatGPT, Claude, and Gemini.</p>
                </div>

                <h2>The Mechanics of Model Fine-Tuning</h2>
                <p>Modern AI models undergo two main phases of development:</p>
                <ul>
                  <li><strong>Pre-training:</strong> The model reads billions of pages from the internet to learn language structure, grammar, and generic associations. In this phase, it behaves like a highly advanced autocomplete tool.</li>
                  <li><strong>Supervised Fine-Tuning (SFT) & RLHF:</strong> This is where you come in. Trainers provide the model with high-quality instructions, write responses, and grade existing model outputs. This guides the model to answer prompts directly rather than just continuing the sentence.</li>
                </ul>

                <h2>Daily Workflow & Income Tiers</h2>
                <p>As a verified AI trainer, your day-to-day workflow consists of selecting active task queues, reading specific prompt instructions, evaluating candidate responses side-by-side (pairwise comparison), and writing detailed justifications explaining which response is better and why. Compensation generally tracks your domain expertise: general writing pays standard rates, while technical paths (coding, SQL) and advanced STEM/medical domains pay premium hourly tiers.</p>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "acing-platform-assessments",
    title: "Acing the Platform Assessments",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Most candidates fail screening not from lack of skill, but because they miss what is being evaluated. Master assessment formats, instruction parsing, and quality rules.",
    long_description: "Learn how to successfully pass screening trials and onboarding tasks on major platforms like Outlier, Alignerr, and DataAnnotation. We analyze actual test formats, common traps, and quality guidelines.",
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
      "Understand trial task guidelines and evaluation rubrics",
      "Avoid common screening failure traps and automatic filters",
      "Replicate the scoring rubrics used by platform auditors"
    ],
    prerequisites: ["Introduction to AI Training and Optimization"],
    curriculum: [
      {
        title: "Assessment Prep",
        lessons: [
          {
            id: "acing-l1",
            title: "Cracking the Screening Code",
            duration: "25 min",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Why Most Candidates Fail the Onboarding Screening</h2>
                <p>Onboarding assessments on platforms like Outlier or DataAnnotation are highly structured quality checkpoints. Over 80% of applicants fail because they skim the prompt, miss subtle constraints, or write generic justifications that do not explain their reasoning.</p>

                <h2>Key Evaluation Dimensions</h2>
                <p>Auditors grade your assessments on three primary dimensions:</p>
                <ol>
                  <li><strong>Instruction Adherence:</strong> Did you catch every constraint in the prompt? (e.g., word count, formatting, formatting rules, negative constraints).</li>
                  <li><strong>Factual Rigor:</strong> Did you fact-check every claim in the response, or did you take the model's word for it?</li>
                  <li><strong>Rationale Quality:</strong> Is your written feedback objective, specific, and structured? Avoid phrases like "Response A flows better." Instead, write: "Response A is superior because it adheres to the negative constraint in line 3 (excluding the word 'the'), whereas Response B includes 'the' twice."</li>
                </ol>

                <div class="academy-callout">
                  <p><strong>Pro Tip:</strong> Treat onboarding assessments as open-book exams. Keep the formatting guidelines open in a side window, and double-check your work before submitting.</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "first-evaluation-task",
    title: "Executing Your First Evaluation Task",
    image_url: "/images/course-foundation.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Step through a pairwise response comparison task. Learn how to rank model outputs, isolate errors, and write professional rubrics.",
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
      "Write a defensible, detailed review rationale",
      "Utilize standard markup to highlight error areas"
    ],
    prerequisites: ["Acing the Platform Assessments"],
    curriculum: [
      {
        title: "Task Practice",
        lessons: [
          {
            id: "eval-l1",
            title: "Simulating a Pairwise Comparison",
            duration: "30 min",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>The Structure of Pairwise Tasks</h2>
                <p>In a typical pairwise task, you are given a USER prompt and two model outputs (Response A and Response B). Your job is to select which output is better based on a set of criteria: correctness, instruction following, truthfulness, and style.</p>

                <h2>Writing a Quality Justification</h2>
                <p>A high-quality justification follows a structured format:</p>
                <ul>
                  <li><strong>The Verdict:</strong> State which response is preferred and the margin of preference (e.g., Response A is slightly better, Response B is significantly better).</li>
                  <li><strong>Instruction Adherence:</strong> Compare how well each response followed the instructions.</li>
                  <li><strong>Factuality & Correctness:</strong> Point out any inaccuracies, logical errors, or formatting issues in either response.</li>
                  <li><strong>Stylistic Comparison:</strong> Discuss tone, formatting (like lists or tables), and readability.</li>
                </ul>

                <div class="exercise-block">
                  <div class="exercise-header">
                    <span>Exercise: Rationale Evaluation</span>
                  </div>
                  <p>Read the following two rationales. Which one would an auditor approve?</p>
                  <div class="response-container">
                    <div class="response-card">
                      <strong>Rationale 1:</strong> "Response A is better because it is more polite and explains things in a nice way. Response B is too short."
                    </div>
                    <div class="response-card response-card-celadon">
                      <strong>Rationale 2:</strong> "Response A is preferred. It followed all prompt guidelines, including the constraint to write in three paragraphs. Response B failed this constraint by writing only one paragraph, and it also hallucinated the release year of Python 3.0 as 2005 instead of 2008."
                    </div>
                  </div>
                  <p>Rationale 2 is the correct approach. It is specific, objective, and lists the exact constraints and facts evaluated.</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "alignment-rlhf-deep-dive",
    title: "Deep Dive into Alignment & RLHF",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Understand the technical pipeline behind model alignment, including RLHF, PPO, DPO, reward modeling, and loss metrics.",
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
      "Explain the technical phases of model alignment",
      "Trace how annotation signals shape reward model training",
      "Identify how annotation errors cause policy degradation"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "RLHF Deep Dive",
        lessons: [
          {
            id: "align-l1",
            title: "Technical Alignment & RLHF Pipeline",
            duration: "30 min",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>The Technical Alignment Pipeline</h2>
                <p>Large Language Models are aligned using human feedback to prevent unsafe outputs and ensure they follow user instructions. The pipeline consists of three core phases:</p>
                <ol>
                  <li><strong>Supervised Fine-Tuning (SFT):</strong> Curated datasets of prompt-response pairs written by humans are used to train the model to answer queries.</li>
                  <li><strong>Reward Model (RM) Training:</strong> Human trainers rate and rank multiple outputs for a single prompt. This ranking is used to train a secondary model (the Reward Model) that scores how well responses align with human preferences.</li>
                  <li><strong>Reinforcement Learning (PPO/DPO):</strong> The model generates responses, the Reward Model scores them, and policy optimization algorithms (like PPO or DPO) update the model's weights to maximize the score.</li>
                </ol>

                <div class="academy-callout">
                  <p><strong>Why Quality Matters:</strong> If a human trainer ranks a response with incorrect facts higher than a correct one, the Reward Model learns to reward factual errors. This degrades the final model's accuracy during the policy optimization phase.</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "fact-verification-research",
    title: "Fact Verification & Ground Truth Research",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn how to fact-check responses rigorously, locate primary sources, and build verifiable truth files to back up your judgments.",
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
      "Isolate and test factual claims in model outputs",
      "Verify source credibility and cross-reference assertions",
      "Format reference links and structured truth reports"
    ],
    prerequisites: ["Executing Your First Evaluation Task"],
    curriculum: [
      {
        title: "Research Methods",
        lessons: [
          {
            id: "fact-l1",
            title: "Auditing & Verifying Claims",
            duration: "1 hour",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>The Factual Auditing Process</h2>
                <p>Hallucinations (plausible-sounding but false statements) are a major challenge for AI models. As a trainer, you must act as a fact-checker. Never assume a model's claims, numbers, dates, or code functions are correct.</p>

                <h2>Steps to Verify Claims</h2>
                <ol>
                  <li><strong>Isolate Claims:</strong> Read the model response and extract all statements of fact (e.g., historical events, math calculations, code API calls, scientific statistics).</li>
                  <li><strong>Locate Primary Sources:</strong> Search for reputable primary sources (official documentation, academic papers, government reports). Avoid blogs, wikis, or forums unless they link to primary evidence.</li>
                  <li><strong>Document Evidence:</strong> Write out your verification findings, citing the specific URLs and quoting the relevant source text.</li>
                </ol>

                <div class="quick-ref-card">
                  <h2>Fact-Checking Checklist</h2>
                  <ul>
                    <li>Is the source current and authoritative?</li>
                    <li>Did you check the original API documentation, rather than third-party tutorials?</li>
                    <li>Does the model response accurately represent the cited source, or did it misinterpret the context?</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "instruction-parsing-adherence",
    title: "Instruction Parsing and Rubric Adherence",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Master the art of auditing long, complex prompts containing nested rules, style constraints, and negative constraints.",
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
      "Deconstruct nested constraints in complex prompts",
      "Verify negative constraints systematically",
      "Score compliance percentages for instruction execution"
    ],
    prerequisites: ["Executing Your First Evaluation Task"],
    curriculum: [
      {
        title: "Instruction Adherence",
        lessons: [
          {
            id: "inst-l1",
            title: "Handling Complex Prompt Constraints",
            duration: "1.5 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Deconstructing Long Prompts</h2>
                <p>AI models are frequently prompted with complex instructions that contain multiple requirements. If a model misses even a minor constraint, it fails the task. You must audit each constraint one-by-one.</p>

                <h2>Types of Constraints</h2>
                <ul>
                  <li><strong>Formatting Constraints:</strong> Requesting specific formatting (e.g., bullet points, tables, headings, or bold terms).</li>
                  <li><strong>Length Constraints:</strong> Minimum/maximum word counts, sentence counts, or paragraphs.</li>
                  <li><strong>Negative Constraints:</strong> Restricting what the model *cannot* include (e.g., "Do not use passive voice," "Do not mention Python 2.x," "Exclude the letter 'e'").</li>
                  <li><strong>Tone & Style Constraints:</strong> Dictating the target audience or writing style (e.g., "Explain to a 10-year-old," "Write in a professional, brief tone").</li>
                </ul>

                <div class="academy-callout">
                  <p><strong>Rule of Thumb:</strong> When auditing constraints, write a checklist of all requirements. Mark each as Passed or Failed for both responses to guarantee accuracy.</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "data-formatting-syntax-validation",
    title: "Data Formatting, JSON & Markdown Syntax",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn syntax standards for AI data: clean GitHub Flavored Markdown (GFM), structured JSON schemas, and escaping symbols.",
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
      "Format outputs correctly for function-calling tasks"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Syntax Rules",
        lessons: [
          {
            id: "syntax-l1",
            title: "Markdown, JSON & Data Formatting",
            duration: "1 hour",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>The Importance of Clean Syntax</h2>
                <p>AI datasets must be clean and structured. Syntax errors in Markdown or JSON complicate downstream parser pipelines and degrade model fine-tuning. You must ensure all responses adhere strictly to formatting specifications.</p>

                <h2>Markdown Standards (GFM)</h2>
                <ul>
                  <li><strong>Headers:</strong> Ensure proper spacing (e.g., <code># Header</code>, not <code>#Header</code>).</li>
                  <li><strong>Tables:</strong> Ensure correct delimiters and alignment notation.</li>
                  <li><strong>Code Blocks:</strong> Always specify the language identifier (e.g., <code>\`\`\`python</code>).</li>
                </ul>

                <h2>JSON Validation</h2>
                <p>When prompts require JSON formatting, the output must be valid JSON. Common errors to check:</p>
                <ol>
                  <li>Missing closing braces or brackets.</li>
                  <li>Using unescaped double quotes inside strings.</li>
                  <li>Using trailing commas in arrays or objects.</li>
                </ol>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "safety-triage-policy-compliance",
    title: "Safety Triage and Policy Compliance",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn how to triage prompts for safety hazards, recognize over-flagging errors, and align evaluations with compliance policies.",
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
      "Calibrate refusal boundaries for sensitive prompts",
      "Avoid the over-flagging penalty in evaluations",
      "Structure safety reasoning rubrics"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Safety Policies",
        lessons: [
          {
            id: "safe-l1",
            title: "Safety Triage Guidelines",
            duration: "45 min",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Refusal vs. Compliance Boundaries</h2>
                <p>AI models must refuse to generate content that promotes severe harm, illegal activities, or hate speech. However, a common error is "over-flagging"—refusing requests that are safe but touch on sensitive topics.</p>

                <h2>Evaluating Prompt Context</h2>
                <p>You must differentiate between malicious intent and benign context:</p>
                <ul>
                  <li><strong>Malicious:</strong> "Write a guide on how to build a bomb using common household items." (Model must refuse).</li>
                  <li><strong>Benign/Educational:</strong> "Explain the history of dynamite and how it was invented." (Model should comply with educational facts).</li>
                  <li><strong>Creative/Fictional:</strong> "Write a scene for a movie where two detectives discuss a cybercrime." (Model should comply safely).</li>
                </ul>

                <div class="academy-callout">
                  <p><strong>Over-Flagging Warning:</strong> Reviewers who approve model refusals for safe, educational prompts risk account suspension. Ensure the model only refuses when there is a real policy violation.</p>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "full-task-player-simulation",
    title: "Full-Scale Task Player Simulation",
    image_url: "/images/course-core.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Zero theory. Practice ranking and rationalizing multi-constraint tasks in a high-fidelity workspace simulator.",
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
    prerequisites: ["Introduction to AI Training and Optimization", "Data Formatting, JSON & Markdown Syntax", "Safety Triage and Policy Compliance"],
    curriculum: [
      {
        title: "Simulation Phase",
        lessons: [
          {
            id: "sim-l1",
            title: "Simulated Task Audits",
            duration: "1.5 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Hands-On Sandbox Simulation</h2>
                <p>This module provides a simulation of a standard platform workspace. You will review a series of prompt scenarios, evaluate the model outputs, and write rationale justifications under a time limit.</p>

                <h2>Step-by-Step Task Breakdown</h2>
                <ol>
                  <li><strong>Step 1: Read the Prompt & Guidelines.</strong> Isolate all prompt requirements.</li>
                  <li><strong>Step 2: Compare Responses.</strong> Review Response A and Response B side-by-side. Check formatting, constraints, and correctness.</li>
                  <li><strong>Step 3: Verification.</strong> Fact-check all claims and run any code blocks to verify output correctness.</li>
                  <li><strong>Step 4: Draft Rationale.</strong> Write your detailed evaluation rationale following the academy template.</li>
                </ol>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "code-evaluation-python-auditing",
    title: "Code Evaluation & Python Auditing for AI",
    image_url: "/images/course-technical.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Learn to audit code correctness, verify runtime complexity (Big O), PEP8 style, and security hazards in Python outputs.",
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
      "Evaluate algorithmic correctness and runtime complexity",
      "Write testing fixtures to verify code outputs",
      "Audit pythonic styling and PEP8 conventions"
    ],
    prerequisites: ["Basic Python programming background"],
    curriculum: [
      {
        title: "Code Review",
        lessons: [
          {
            id: "code-l1",
            title: "Python Code Auditing and Evaluation",
            duration: "2 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Auditing Code Correctness & Efficiency</h2>
                <p>Technical coding tasks require precision. AI models often generate code that looks correct but fails on edge cases or runs inefficiently. Your job is to perform a professional code review.</p>

                <h2>Reviewing Code Quality</h2>
                <ul>
                  <li><strong>Algorithmic Complexity:</strong> Compare the time and space complexity of Response A and Response B. (e.g., is one O(N) while the other is O(N^2)?). Prefer the more efficient algorithm.</li>
                  <li><strong>Edge Cases:</strong> Check how the code handles empty inputs, negative numbers, large data structures, or unexpected types.</li>
                  <li><strong>Stylistic Quality:</strong> Ensure Python code follows PEP8 naming conventions, has helpful docstrings, and avoids redundant code blocks.</li>
                </ul>

                <div class="quick-ref-card">
                  <h2>Python Review Guidelines</h2>
                  <ul>
                    <li>Do not take code correctness for granted; run it locally or trace the logic line-by-line.</li>
                    <li>Verify imports: did the model use correct, standard libraries?</li>
                    <li>Check helper functions: are they necessary and correctly implemented?</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "db-query-auditing-sql",
    title: "Database Query Auditing and SQL Analysis",
    image_url: "/images/course-technical.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Verify SQL syntax, correct JOIN conditions, aggregates, database schema compatibility, and query execution performance.",
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
      "Detect logic flaws in SQL JOINs and group by aggregates",
      "Trace database query execution efficiency",
      "Format structured tables and data representations"
    ],
    prerequisites: ["Basic SQL syntax familiarity"],
    curriculum: [
      {
        title: "SQL Analysis",
        lessons: [
          {
            id: "sql-l1",
            title: "SQL Logic and Query Validation",
            duration: "1.5 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Evaluating Database Queries</h2>
                <p>When auditing SQL queries, you must ensure that they not only execute without errors but also return the exact data requested in the prompt. Common model errors often involve JOIN logic and aggregates.</p>

                <h2>Common SQL Auditing Checkpoints</h2>
                <ul>
                  <li><strong>JOIN Types:</strong> Verify if the model used the correct JOIN type (INNER, LEFT, RIGHT, FULL). Using INNER instead of LEFT can omit rows with NULL values.</li>
                  <li><strong>GROUP BY & Aggregates:</strong> Ensure that all non-aggregated columns in the SELECT clause are included in the GROUP BY clause.</li>
                  <li><strong>SQL Performance:</strong> Check if queries are optimized (e.g., using indexes, avoiding SELECT * when specific columns are needed, using LIMIT where appropriate).</li>
                </ul>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "creative-writing-style-alignment",
    title: "Creative Writing and Stylistic Alignment",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Audit style guides, tone tuning, pacing, and originality, and red-team creative model outputs for monotony.",
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
      "Enforce style guide conventions and pacing strictly",
      "Evaluate tone, voice, and vocabulary choices",
      "Audit brainstorming suggestions for originality and quality"
    ],
    prerequisites: ["None"],
    curriculum: [
      {
        title: "Creative Alignment",
        lessons: [
          {
            id: "creative-l1",
            title: "Creative Writing Style Guidelines",
            duration: "2 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Evaluating Stylistic Content</h2>
                <p>Unlike objective coding tasks, creative writing tasks are graded on tone, pacing, metaphor, and adherence to style guides. AI models have a tendency to produce generic, clichéd prose (e.g., starting stories with "Once upon a time" or using words like "testament" and "beacon").</p>

                <h2>Quality Standards for Creative Writing</h2>
                <ul>
                  <li><strong>Voice Alignment:</strong> Did the response capture the specific tone requested in the prompt? (e.g., satirical, journalistic, colloquial).</li>
                  <li><strong>Formatting & Flow:</strong> Check sentence structure variety. Ensure paragraphs flow naturally.</li>
                  <li><strong>Originality Audit:</strong> Red-team the response for AI clichés and repetitive vocabulary. Prefer outputs that display genuine human-like creative expression.</li>
                </ul>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "healthcare-scribing-hipaa-privacy",
    title: "Healthcare Scribing and Privacy Regulations (HIPAA) in AI",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Format SOAP clinical summaries, verify medical terminology, and strictly follow HIPAA rules regarding Protected Health Information (PHI).",
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
      "Structure clinical SOAP summaries correctly",
      "Verify medical terminology, drug names, and abbreviations"
    ],
    prerequisites: ["Medical or clinical background recommended"],
    curriculum: [
      {
        title: "Medical Privacy",
        lessons: [
          {
            id: "medical-l1",
            title: "Clinical Scribing & HIPAA Compliance",
            duration: "2 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>HIPAA & Data Privacy in Medical AI</h2>
                <p>Medical AI training requires strict compliance with privacy regulations like HIPAA (Health Insurance Portability and Accountability Act). The most critical rule is the absolute prevention of leaks containing Protected Health Information (PHI).</p>

                <h2>What Constitutes PHI?</h2>
                <p>Ensure that patient names, specific dates, addresses, phone numbers, and identifying medical conditions are removed or fully anonymized before any data is used in model training.</p>

                <h2>SOAP Note Summaries</h2>
                <p>Clinical notes must be structured using the SOAP format:</p>
                <ul>
                  <li><strong>Subjective (S):</strong> Patient's symptoms, concerns, and history as reported by the patient.</li>
                  <li><strong>Objective (O):</strong> Vital signs, physical exams, and lab test results.</li>
                  <li><strong>Assessment (A):</strong> Diagnosis or clinical reasoning of the encounter.</li>
                  <li><strong>Plan (P):</strong> Treatment plan, medication prescriptions, and follow-up steps.</li>
                </ul>
              </div>
            `
          }
        ]
      }
    ]
  },
  {
    slug: "stem-latex-proof-reasoning",
    title: "STEM & LaTeX Proofing for Advanced Reasoning",
    image_url: "/images/course-domain.png",
    trainer_name: "AI Trainer Academy",
    trainer_initials: "AA",
    trainer_title: "Official Academy Curriculum",
    trainer_bio: "The standard onboarding curriculum for verified AI training candidates.",
    description: "Review mathematical proofs, verify step-by-step logic derivations, and format equations using LaTeX syntax.",
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
      "Format mathematical equations in LaTeX syntax",
      "Trace logical derivations step by step to identify leaps",
      "Audit Olympiad-level math and physics prompts"
    ],
    prerequisites: ["STEM or advanced mathematics background"],
    curriculum: [
      {
        title: "STEM Reasoning",
        lessons: [
          {
            id: "stem-l1",
            title: "LaTeX Proofing & Math Logic Validation",
            duration: "2.5 hours",
            isVideo: false,
            content: `
              <div class="reading-content">
                <h2>Typesetting Math with LaTeX</h2>
                <p>Mathematical equations and scientific formulas must be formatted using LaTeX syntax. Check that formatting tags (such as <code>$</code> for inline math or <code>$$</code> for block equations) are correctly closed and formatted.</p>

                <h2>Auditing Logical Steps</h2>
                <p>AI models often skip logical steps or make arithmetic mistakes during mathematical proofs. You must verify every transition. If a model moves from equation 1 to equation 2, prove that the math holds true and is not a logical leap.</p>

                <div class="quick-ref-card">
                  <h2>STEM Auditing Checklist</h2>
                  <ul>
                    <li>Are LaTeX tags balanced and syntax-valid?</li>
                    <li>Did you check every arithmetic step, especially signs (+/-)?</li>
                    <li>Does the final derivation answer the user's specific question?</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Seeding AI Trainer Academy with 100% original, unique modules...");

  try {
    // 1. Delete old scraped courses from database to resolve copyright claims
    console.log("Deleting old scraped courses...");
    const { error: deleteErr } = await supabase
      .from("courses")
      .delete()
      .in("slug", oldSlugs);

    if (deleteErr) {
      console.error("Error deleting old courses:", deleteErr.message);
    } else {
      console.log("Successfully cleaned up old database entries.");
    }

    // 2. Upsert the new, original course modules
    for (const m of newModules) {
      console.log(`Upserting unique course: ${m.title} (${m.slug})...`);
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

    console.log("\nAll original modules successfully seeded!");
  } catch (err) {
    console.error("Seeding failed with unexpected error:", err);
  }
}

seed();
