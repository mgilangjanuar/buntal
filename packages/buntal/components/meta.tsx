export type MetaProps = Partial<{
  title: string
  viewport: string
  description: string
  keywords: string
  author: string
  og: {
    title?: string
    type?: string
    description?: string
    image?: string
  }
  twitter: {
    title?: string
    description?: string
    image?: string
    card?: string
  }
}>

export function Meta(props: MetaProps) {
  return (
    <>
      <meta charSet="UTF-8" />
      <title>{props.title || 'Buntal App'}</title>
      <meta
        name="viewport"
        content={props.viewport || 'width=device-width, initial-scale=1'}
      />
      {props.description && (
        <meta name="description" content={props.description} />
      )}
      {props.keywords && <meta name="keywords" content={props.keywords} />}
      {props.author && <meta name="author" content={props.author} />}

      <meta
        property="og:title"
        content={props.og?.title || props.title || 'Buntal App'}
      />
      {(props.og?.description || props.description) && (
        <meta
          property="og:description"
          content={props.og?.description || props.description}
        />
      )}
      {props.og?.image && (
        <meta property="og:image" content={props.og?.image} />
      )}
      {props.og?.type && <meta property="og:type" content={props.og?.type} />}

      <meta
        name="twitter:title"
        content={props.twitter?.title || props.title || 'Buntal App'}
      />
      {(props.twitter?.description || props.description) && (
        <meta
          name="twitter:description"
          content={props.twitter?.description || props.description}
        />
      )}
      {props.twitter?.image && (
        <meta name="twitter:image" content={props.twitter?.image} />
      )}
      {props.twitter?.card && (
        <meta name="twitter:card" content={props.twitter?.card} />
      )}
    </>
  )
}
