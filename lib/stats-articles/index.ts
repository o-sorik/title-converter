import type { WritingTipsArticle } from "@/lib/writing-tips-article-data"
import { AVERAGE_TYPING_SPEED_ARTICLE } from "./average-typing-speed"
import { AVERAGE_READING_SPEED_ARTICLE } from "./average-reading-speed"
import { COMMONLY_MISSPELLED_WORDS_ARTICLE } from "./commonly-misspelled-words"
import { COMMON_GRAMMAR_MISTAKES_ARTICLE } from "./common-grammar-mistakes"
import { HOW_LONG_SHOULD_A_BLOG_POST_BE_ARTICLE } from "./how-long-should-a-blog-post-be"
import { HOW_MANY_WORDS_IN_A_NOVEL_ARTICLE } from "./how-many-words-in-a-novel"

// Writing Statistics cluster. One article per module so drafts can be
// authored independently; the order here controls category-page order.
export const STATS_ARTICLES: WritingTipsArticle[] = [
  AVERAGE_TYPING_SPEED_ARTICLE,
  AVERAGE_READING_SPEED_ARTICLE,
  COMMONLY_MISSPELLED_WORDS_ARTICLE,
  COMMON_GRAMMAR_MISTAKES_ARTICLE,
  HOW_LONG_SHOULD_A_BLOG_POST_BE_ARTICLE,
  HOW_MANY_WORDS_IN_A_NOVEL_ARTICLE,
]
