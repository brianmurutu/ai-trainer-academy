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

const slugs = [
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

async function scrapeAndImport() {
  console.log("Starting scraping and database import of module contents...");

  for (const slug of slugs) {
    console.log(`\n--------------------------------------------`);
    console.log(`Processing: ${slug}...`);

    try {
      // 1. Fetch course details from database first
      const { data: dbCourse, error: fetchErr } = await supabase
        .from("courses")
        .select("id, title, duration, curriculum")
        .eq("slug", slug)
        .maybeSingle();

      if (fetchErr || !dbCourse) {
        console.error(`Course not found in DB for slug: ${slug}`, fetchErr?.message);
        continue;
      }

      // 2. Fetch HTML content from original site
      const url = `https://aitrainer.work/academy/${slug}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch from ${url} (status: ${res.status})`);
        continue;
      }

      const html = await res.text();

      // 3. Extract article content using regex and index boundary
      let startMatch = html.match(/<article[^>]*class="prose[^"]*"[^>]*>/);
      if (!startMatch) {
        console.error(`Could not find start of <article class="prose..."> tag for: ${slug}`);
        continue;
      }

      const startIndex = startMatch.index + startMatch[0].length;
      const endIndex = html.indexOf("</article>", startIndex);

      if (endIndex === -1) {
        console.error(`Could not find closing </article> tag for: ${slug}`);
        continue;
      }

      let content = html.substring(startIndex, endIndex).trim();

      // 4. Rewrite local image links to absolute aitrainer.work paths
      content = content.replace(/src="\/img\//g, 'src="https://aitrainer.work/img/');
      content = content.replace(/src='\/img\//g, "src='https://aitrainer.work/img/");

      console.log(`Extracted content size: ${content.length} characters.`);

      // 5. Update curriculum with actual text content
      const updatedCurriculum = [
        {
          title: "Syllabus & Material",
          lessons: [
            {
              id: `${slug}-l1`,
              title: dbCourse.title,
              duration: dbCourse.duration || "30 min",
              isVideo: false,
              content: content
            }
          ]
        }
      ];

      // 6. Update database record
      const { error: updateErr } = await supabase
        .from("courses")
        .update({ curriculum: updatedCurriculum })
        .eq("id", dbCourse.id);

      if (updateErr) {
        console.error(`Failed to update DB for course: ${slug}`, updateErr.message);
      } else {
        console.log(`Successfully updated DB with rich reading content for: ${slug}`);
      }
    } catch (err) {
      console.error(`Unexpected error processing ${slug}:`, err.message || err);
    }
  }

  console.log("\nDone!");
}

scrapeAndImport();
