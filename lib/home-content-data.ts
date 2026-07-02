export interface TitleCaseMistake {
  wrong: string
  correct: string
  why: string
}

export const TITLE_CASE_MISTAKES: TitleCaseMistake[] = [
  { wrong: "A Guide To Better Writing", correct: "A Guide to Better Writing", why: "Short prepositions are usually lowercase." },
  { wrong: "How to Build a brand Voice", correct: "How to Build a Brand Voice", why: "Nouns are major words." },
  { wrong: "The Science of growth", correct: "The Science of Growth", why: "Last word is always capitalized." },
  { wrong: "Working with Api Data", correct: "Working with API Data", why: "Acronyms should keep intended casing." },
  { wrong: "Turn on Notifications Fast", correct: "Turn On Notifications Fast", why: "In phrasal verbs, second word may be a major word." },
  { wrong: "State-of-the-art Design System", correct: "State-of-the-Art Design System", why: "Hyphenated compounds often capitalize major elements." },
  { wrong: "Content Rules: how to Scale", correct: "Content Rules: How to Scale", why: "Subtitles after colons often start with a capitalized word." },
  { wrong: "Why is This Important", correct: "Why Is This Important", why: "Verbs such as \"is\" are capitalized." },
  { wrong: "Learning From The Best", correct: "Learning from the Best", why: "Articles and short prepositions are usually lowercase in the middle." },
  { wrong: "An Introduction to ui Design", correct: "An Introduction to UI Design", why: "Initialisms should keep their standard uppercase format." },
]
