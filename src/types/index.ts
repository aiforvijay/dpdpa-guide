export interface SubSubSection {
  id: string;
  title: string;
  content: string;
}

export interface SubSection {
  id: string;
  title: string;
  content: string;
  subsubsections?: SubSubSection[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  subsections?: SubSection[];
}

export interface Illustration {
  id: string;
  title: string;
  content: string;
  relatedSection: string;
}
