export type Author = {
  id: string
  name: string
  role: string
  bio: string
}

const authors: Author[] = [
  {
    id: "oleh-kovalenko",
    name: "Oleh Kovalenko",
    role: "Founder & Lead Editor",
    bio: "Builds editorial tools and writes practical capitalization guides grounded in AP, APA, MLA, and Chicago standards.",
  },
  {
    id: "sarah-klein",
    name: "Sarah Klein",
    role: "Style Guide Specialist",
    bio: "Focuses on APA and academic formatting, helping researchers and students navigate title case rules with confidence.",
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Academic Writing Editor",
    bio: "Covers citation formatting and reference styles across APA and MLA for academic papers and theses.",
  },
  {
    id: "mia-gomez",
    name: "Mia Gomez",
    role: "Content Strategist",
    bio: "Specializes in heading hierarchy and document structure for long-form academic and editorial content.",
  },
  {
    id: "nadia-ross",
    name: "Nadia Ross",
    role: "Journalism Editor",
    bio: "Brings AP style expertise from newsroom and digital media workflows to practical capitalization guidance.",
  },
  {
    id: "noah-brooks",
    name: "Noah Brooks",
    role: "Comparative Style Analyst",
    bio: "Breaks down differences between MLA, APA, and Chicago conventions to help writers choose the right approach.",
  },
  {
    id: "mila-ross",
    name: "Mila Ross",
    role: "UX Writing Consultant",
    bio: "Guides teams on choosing between title case and sentence case for UI copy, marketing, and professional messaging.",
  },
  {
    id: "sophia-stewart",
    name: "Sophia Stewart",
    role: "Grammar & Usage Editor",
    bio: "Researches word-level capitalization rules and edge cases across AP, APA, MLA, and Chicago style guides.",
  },
]

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((a) => a.name === name)
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}

export function getAllAuthors(): Author[] {
  return authors
}
