export interface GenericLink {
  url?: string
  display?: string
}

export interface SocialLink extends GenericLink {
  imageHref: string
  title: string
}
