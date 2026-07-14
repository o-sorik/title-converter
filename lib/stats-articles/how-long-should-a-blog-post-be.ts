import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"

export const HOW_LONG_SHOULD_A_BLOG_POST_BE_ARTICLE: WritingTipsArticle = {
  slug: "how-long-should-a-blog-post-be",
  tags: ["Writing Statistics", "Blogging", "SEO"],
  ctaWord: "how long should a blog post be",
  ctaText:
    "Once the length is right, the title is what earns the click – capitalize it correctly with the free Title Case Converter.",
  relatedSlugs: [
    "average-typing-speed",
    "average-reading-speed",
    "how-many-words-in-a-novel",
    "commonly-misspelled-words",
    "what-words-are-not-capitalized-in-a-title",
  ],
  faqItems: [
    {
      question: "How long should a blog post be for SEO?",
      answer:
        "There is no Google-preferred word count – Google's own documentation and John Mueller both say word count is not a ranking factor. The average top-10 Google result contains 1,447 words (Backlinko, 2020), but that study found no direct relationship between length and rankings. Cover the topic fully; for most standard posts that lands between roughly 1,300 and 2,500 words.",
    },
    {
      question: "What is the average blog post length?",
      answer:
        "The average blog post is 1,333 words, according to Orbit Media's 2025 survey of 808 bloggers. That is up 65% from 808 words in 2014, but down from the 2023 peak of 1,427 words – the first sustained decline in the survey's history.",
    },
    {
      question: "Is a 500-word blog post too short?",
      answer:
        "Not automatically. Google has no minimum word count, and about a third of HubSpot's 50 most-read posts of 2019 were under 1,500 words. The trade-off is distribution: in Semrush's 2019 study of 700,000+ articles, 300-900-word posts ended up with zero shares 4.5 times more often than 3,000+ word long-reads. A short post can rank and convert; it is less likely to earn links and shares.",
    },
    {
      question: "How long does it take to write a blog post?",
      answer:
        "3 hours 25 minutes on average, per Orbit Media's 2025 survey. That is up from 2 hours 24 minutes in 2014 but down from the 2022 peak of 4 hours 10 minutes – a decline Orbit links to AI-assisted drafting.",
    },
    {
      question: "Do longer blog posts get more backlinks?",
      answer:
        "On average, yes – content over 3,000 words earned 77.2% more referring-domain links than content under 1,000 words in the Backlinko and BuzzSumo analysis of 912 million posts (2019). But the same study found 94% of all posts get zero external links, and the finding is correlational: comprehensive posts tend to be long, but padding a post does not attract links by itself.",
    },
  ],
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "paragraph",
          text: "The average blog post is 1,333 words, according to [Orbit Media's 2025 survey](https://www.orbitmedia.com/blog/blogging-statistics/) of 808 bloggers – and Google itself says it has [no preferred word count](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). If you want a working range instead of a single number, the strongest datasets cluster between roughly 1,300 and 2,500 words for a standard post.",
        },
        {
          type: "paragraph",
          text: "Two other numbers frame the decision. Bloggers who write 2,000+ word posts are almost twice as likely to report strong results (39% vs. a 21% benchmark, [Orbit Media, 2025](https://www.orbitmedia.com/blog/blogging-statistics/)). And after a decade of growth, average post length is now shrinking – down about 7% from its 2023 peak. Here is what the data actually supports, stat by stat.",
        },
        {
          type: "keyStats",
          items: [
            "The average blog post is **1,333 words** – up 65% from 808 words in 2014, but down from the 2023 peak of 1,427 ([Orbit Media, 2025](https://www.orbitmedia.com/blog/blogging-statistics/))",
            "Google has no preferred word count – its documentation answers the question with “(No, we don't.)” ([Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content))",
            "The average Google top-10 result contains **1,447 words** – but the same study found no direct relationship between word count and rankings ([Backlinko, 2020](https://backlinko.com/search-engine-ranking))",
            "Content over 3,000 words earns **77.2% more** referring-domain links than content under 1,000 words ([Backlinko × BuzzSumo, 2019](https://backlinko.com/content-study))",
            "**94% of blog posts** get zero external links ([Backlinko × BuzzSumo, 2019](https://backlinko.com/content-study))",
            "Articles over 3,000 words get **3x more traffic** and 4x more shares than average-length articles ([Semrush, 2019](https://www.semrush.com/blog/anatomy-of-top-performing-articles/))",
            "Posts that take **7 minutes to read** capture the most total reading time ([Medium Data Lab, 2013](https://medium.com/data-lab/the-optimal-post-is-7-minutes-74b9f41509b))",
            "Bloggers who write 2,000+ word posts are ~2x as likely to report strong results – **39% vs. 21%** ([Orbit Media, 2025](https://www.orbitmedia.com/blog/blogging-statistics/))",
            "The average post takes **3 hours 25 minutes** to write, down from the 2022 peak of 4 hours 10 minutes ([Orbit Media, 2025](https://www.orbitmedia.com/blog/blogging-statistics/))",
          ],
        },
      ],
    },
    {
      id: "average-length",
      heading: "How Long Is the Average Blog Post?",
      tocLabel: "Average length over time",
      blocks: [
        {
          type: "paragraph",
          text: "The best year-over-year data on average blog post length comes from [Orbit Media's annual blogger survey](https://www.orbitmedia.com/blog/blogging-statistics/), which has asked 800-1,100 content marketers the same questions every year since 2014 (12,971 cumulative respondents). The published figures:",
        },
        {
          type: "barList",
          items: [
            { label: "2014", percent: 57, display: "808 words" },
            { label: "2017", percent: 80, display: "1,142 words" },
            { label: "2018", percent: 81, display: "1,151 words" },
            { label: "2019", percent: 87, display: "1,236 words" },
            { label: "2021", percent: 99, display: "1,416 words" },
            { label: "2022", percent: 96, display: "1,376 words" },
            { label: "2023", percent: 100, display: "1,427 words (peak)" },
            { label: "2024", percent: 98, display: "1,394 words" },
            { label: "2025", percent: 93, display: "1,333 words" },
          ],
        },
        {
          type: "paragraph",
          text: "The long-running story was “posts keep getting longer” – a 65% increase from 2014 to the 2023 peak. The newer story is the reversal: 1,427 → 1,394 → 1,333 words from 2023 to 2025. That is the first sustained decline in the survey's history, and it coincides with the arrival of AI-assisted drafting – the same surveys show writing time falling over the same period.",
        },
        {
          type: "paragraph",
          variant: "note",
          text: "Methodology note: these are self-reported figures from a survey that skews toward US, B2B, and LinkedIn-active marketers – treat them as a benchmark for professional blogging, not the entire web.",
        },
      ],
    },
    {
      id: "seo-rankings",
      heading: "Does Word Count Affect SEO Rankings?",
      tocLabel: "Word count and SEO",
      blocks: [
        {
          type: "paragraph",
          text: "No – not directly, and this comes from Google itself. Google's [helpful content documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) includes the self-assessment question: “Are you writing to a particular word count because you've heard or read that Google has a preferred word count? (No, we don't.)” The parenthetical is Google's own.",
        },
        {
          type: "paragraph",
          text: "Google's John Mueller was just as blunt in a 2021 office-hours session: [“From our point of view the number of words on a page is not a quality factor, not a ranking factor”](https://www.searchenginejournal.com/word-count-not-a-quality-factor/397288/) (Search Engine Journal, 2021).",
        },
        {
          type: "paragraph",
          text: "So why does everyone cite word counts for SEO? Because of correlation studies. [Backlinko's analysis of 11.8 million Google search results](https://backlinko.com/search-engine-ranking) (2020, updated 2025) found the average top-10 result contains 1,447 words. But the study itself adds the caveat most re-blogs drop: word count was evenly distributed across the top 10, and the authors found “no direct relationship between word count and rankings.”",
        },
        {
          type: "paragraph",
          text: "The likely mechanism is indirect. Longer pages tend to cover more subtopics, match more queries, and earn more links – byproducts of comprehensiveness, not of the word count itself. Padding a 700-word answer to 2,000 words buys you nothing from Google.",
        },
      ],
    },
    {
      id: "backlinks-shares",
      heading: "Do Longer Posts Get More Backlinks and Shares?",
      tocLabel: "Backlinks and shares",
      blocks: [
        {
          type: "paragraph",
          text: "On average, yes – and this is where long-form content earns its reputation. The largest dataset comes from [Backlinko and BuzzSumo's analysis of 912 million blog posts](https://backlinko.com/content-study) (2019):",
        },
        {
          type: "statHighlight",
          items: [
            {
              value: "+77.2%",
              label: "more referring-domain links for 3,000+ word content vs. content under 1,000 words",
              sourceName: "Backlinko × BuzzSumo, 2019",
              sourceHref: "https://backlinko.com/content-study",
            },
            {
              value: "94%",
              label: "of blog posts get zero external links; only 2.2% earn links from multiple sites",
              sourceName: "Backlinko × BuzzSumo, 2019",
              sourceHref: "https://backlinko.com/content-study",
            },
            {
              value: "+56.1%",
              label: "more social shares for 1,000-2,000-word posts vs. posts under 1,000 words",
              sourceName: "Backlinko × BuzzSumo, 2019",
              sourceHref: "https://backlinko.com/content-study",
            },
            {
              value: "3x",
              label: "more traffic for 3,000+ word articles vs. average-length articles (901-1,200 words)",
              sourceName: "Semrush, 2019",
              sourceHref: "https://www.semrush.com/blog/anatomy-of-top-performing-articles/",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Note the shape of the share data: shares peak in the 1,000-2,000-word range and show diminishing returns past roughly 2,000 words. Links keep climbing with length; shares do not.",
        },
        {
          type: "paragraph",
          text: "A second dataset triangulates the link finding. [Semrush's study of 700,000+ articles](https://www.semrush.com/blog/anatomy-of-top-performing-articles/) (2019) found 3,000+ word articles get 3x more traffic, 4x more shares, and 3.5x more backlinks than average-length articles – and that 300-900-word posts end up with zero shares 4.5x more often than long-reads.",
        },
        {
          type: "paragraph",
          text: "One caveat belongs next to every number above: these are correlations. [Content Marketing Institute](https://contentmarketinginstitute.com/articles/test-content-research/) and analyst [Josh Bernoff](https://bernoff.com/blog/correlation-causation-and-confusion-the-backlinko-study-of-912-million-blog-posts) both published critiques of the 912M-post study's causal framing. Ambitious topics get long treatments *and* attract links; the length itself is not the cause. The 94%-get-zero-links figure is the proof – most long posts get nothing too.",
        },
      ],
    },
    {
      id: "engagement",
      heading: "What Length Keeps Readers Engaged?",
      tocLabel: "Length and engagement",
      blocks: [
        {
          type: "paragraph",
          text: "Reader-behavior data argues for restraint. Medium's product-science team measured total reading time against post length across the platform and found [posts with a 7-minute read time capture the most total reading time](https://medium.com/data-lab/the-optimal-post-is-7-minutes-74b9f41509b) (Medium Data Lab, 2013). The author's own caveat: the variance is enormous, and great posts win at any length.",
        },
        {
          type: "paragraph",
          text: "You have probably seen this cited as “the ideal blog post is 1,600 words.” That number does not appear in Medium's study – the original measures minutes, not words, and 1,600 is a later conversion by a re-blog at an assumed [reading speed](/blog/average-reading-speed). Cite the 7 minutes, not the word count.",
        },
        {
          type: "paragraph",
          text: "The other half of the picture comes from Nielsen Norman Group: on an average visit, [users read at most 28% of the words on a page – realistically about 20%](https://www.nngroup.com/articles/how-little-do-users-read/) (Nielsen, 2008, based on 45,237 instrumented page views). Each additional 100 words earned only about 4.4 seconds of extra attention. Whatever length you choose, most visitors will skim it.",
        },
      ],
    },
    {
      id: "by-post-type",
      heading: "Ideal Blog Post Length by Post Type",
      tocLabel: "Length by post type",
      blocks: [
        {
          type: "paragraph",
          text: "The only widely cited type-by-type benchmarks come from [HubSpot's analysis of its own 50 most-read posts of 2019](https://web.archive.org/web/20210209153342/https://blog.hubspot.com/marketing/how-long-should-your-blog-posts-be-faq) (published 2020, archived – the live post has since been redirected). This is single-site internal data, not an industry study, so read it as “what worked on one very large marketing blog”:",
        },
        {
          type: "table",
          headers: ["Post type", "HubSpot benchmark", "Detail"],
          rows: [
            ["Pillar page", "~4,000 words", "Average 4,048, median 3,639, range 2,137-10,939"],
            ["Listicle", "2,300-2,600 words", "Average 2,574, median 2,332"],
            ["How-to guide", "1,700-2,100 words", "Average 2,151, median 1,669"],
            ["“What is” post", "1,300-1,700 words", "30% of top performers were under 1,000 words"],
          ],
        },
        {
          type: "paragraph",
          text: "Across all 50 posts, the average was 2,330 words and the median 2,164 – the origin of the often-quoted “2,100-2,400 words for SEO.” But the range ran from 333 to 5,581 words, and a third of the top posts were under 1,500. HubSpot's lead-generating posts ran longer still, averaging 2,569 words.",
        },
        {
          type: "paragraph",
          text: "Orbit Media's 2025 survey adds a format angle from the publisher side: [guides and ebooks lead on reported results](https://www.orbitmedia.com/blog/blogging-statistics/) (27% strong results) while opinion pieces trail (20%) – and how-to articles remain the most-published format, written by 76% of bloggers.",
        },
      ],
    },
    {
      id: "writing-time",
      heading: "How Long Does It Take to Write a Blog Post?",
      tocLabel: "Time to write",
      blocks: [
        {
          type: "paragraph",
          text: "The average blog post takes [3 hours 25 minutes to write](https://www.orbitmedia.com/blog/blogging-statistics/) (Orbit Media, 2025). The trend line tells the AI story: 2 hours 24 minutes in 2014, a peak of 4 hours 10 minutes in 2022, then 3 hours 48 minutes in 2024 and 3 hours 25 minutes in 2025 – the first multi-year decline in the survey's history, which Orbit links to AI-assisted drafting.",
        },
        {
          type: "paragraph",
          text: "Compare the two curves and a sharper point emerges: writing time fell about 18% from its peak while average length fell only about 7%. Bloggers are getting faster per word, not just writing less.",
        },
        {
          type: "paragraph",
          text: "The time investment correlates with outcomes, too. In the same 2025 survey, bloggers who publish 2,000+ word posts report strong results at nearly twice the benchmark rate (39% vs. 21%) – though only 9% of bloggers actually publish at that length. As with every stat here, that is self-reported and correlational: the marketers willing to invest 4+ hours per post likely differ in more ways than word count.",
        },
      ],
    },
    {
      id: "title-length",
      heading: "How Long Should a Blog Post Title Be?",
      tocLabel: "Title length",
      blocks: [
        {
          type: "paragraph",
          text: "Length matters for titles too, and the data points in two directions at once. For search, [Moz recommends keeping title tags to 50-60 characters](https://moz.com/learn/seo/title-tag) (~600 pixels) – under 60 characters, about 90% of titles display without truncation in Google. As with body word count, this is a display limit, not a ranking rule: [John Mueller has confirmed there is no title-length ranking factor](https://www.searchenginejournal.com/google-title-tag-length/400682/) (Search Engine Journal, 2021).",
        },
        {
          type: "paragraph",
          text: "For social distribution, longer wins: [14-17-word headlines earned 76.7% more social shares](https://backlinko.com/content-study) than short ones, and question headlines earned 23.3% more shares than non-questions (Backlinko × BuzzSumo, 2019). [Semrush's 700K-article study](https://www.semrush.com/blog/anatomy-of-top-performing-articles/) (2019) agrees: 14+-word headlines drew 2x more traffic and 5x more backlinks than 7-10-word ones.",
        },
        {
          type: "paragraph",
          text: "That is a real tension – the headline length that wins shares gets truncated in search results – so title strategy depends on the channel. What does not change across channels is capitalization: a headline in clean title case reads as edited, and the rules for [which words stay lowercase](/blog/what-words-are-not-capitalized-in-a-title) depend on your style guide. If you write news-style headlines, start with the [AP capitalization rules](/blog/ap-title-capitalization-basics).",
        },
      ],
    },
    {
      id: "sources",
      heading: "Sources",
      hideFromToc: true,
      blocks: [
        {
          type: "sources",
          items: [
            {
              name: "12th Annual Blogger Survey (n=808)",
              publisher: "Orbit Media Studios",
              year: "2025",
              href: "https://www.orbitmedia.com/blog/blogging-statistics/",
            },
            {
              name: "We Analyzed 912 Million Blog Posts",
              publisher: "Backlinko × BuzzSumo",
              year: "2019",
              href: "https://backlinko.com/content-study",
            },
            {
              name: "We Analyzed 11.8 Million Google Search Results",
              publisher: "Backlinko",
              year: "2020",
              href: "https://backlinko.com/search-engine-ranking",
            },
            {
              name: "Creating Helpful, Reliable, People-First Content",
              publisher: "Google Search Central",
              year: "2026",
              href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
            },
            {
              name: "Google: Word Count Is Not a Quality Factor (Mueller quote)",
              publisher: "Search Engine Journal",
              year: "2021",
              href: "https://www.searchenginejournal.com/word-count-not-a-quality-factor/397288/",
            },
            {
              name: "Google on Title Tag Length (Mueller quote)",
              publisher: "Search Engine Journal",
              year: "2021",
              href: "https://www.searchenginejournal.com/google-title-tag-length/400682/",
            },
            {
              name: "The Optimal Post Is 7 Minutes",
              publisher: "Medium Data Lab (Mike Sall)",
              year: "2013",
              href: "https://medium.com/data-lab/the-optimal-post-is-7-minutes-74b9f41509b",
            },
            {
              name: "How Little Do Users Read?",
              publisher: "Nielsen Norman Group",
              year: "2008",
              href: "https://www.nngroup.com/articles/how-little-do-users-read/",
            },
            {
              name: "The Anatomy of Top Performing Articles (700K+ articles)",
              publisher: "Semrush",
              year: "2019",
              href: "https://www.semrush.com/blog/anatomy-of-top-performing-articles/",
            },
            {
              name: "How Long Should Blog Posts Be in 2021? (archived)",
              publisher: "HubSpot",
              year: "2020",
              href: "https://web.archive.org/web/20210209153342/https://blog.hubspot.com/marketing/how-long-should-your-blog-posts-be-faq",
            },
            {
              name: "Title Tag Guidelines",
              publisher: "Moz",
              year: "n.d.",
              href: "https://moz.com/learn/seo/title-tag",
            },
            {
              name: "Could a Study About 912 Million Blog Posts Be Wrong?",
              publisher: "Content Marketing Institute",
              year: "2019",
              href: "https://contentmarketinginstitute.com/articles/test-content-research/",
            },
            {
              name: "Correlation, Causation, and Confusion: The Backlinko Study",
              publisher: "Josh Bernoff",
              year: "2019",
              href: "https://bernoff.com/blog/correlation-causation-and-confusion-the-backlinko-study-of-912-million-blog-posts",
            },
          ],
        },
      ],
    },
  ],
}
