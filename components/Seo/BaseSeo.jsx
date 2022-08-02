import { NextSeo } from 'next-seo'



export const BaseSeo = ({ title, description, metaObject }) => {
  const baseTitle = `PhirLo : Admin Dashboard`
  const baseDescription =
    'Moving towards conscious consumption, one garment at a time.'

  const newTitle = title ? `${title} - ${baseTitle}` : baseTitle
  const seoTitle = newTitle || baseTitle
  const seoDescription = description || baseDescription

  return (
    <>
      {metaObject ? (
        <>
          <NextSeo
            title={metaObject.n_title}
            description={metaObject.n_description}
            openGraph={{
              title: metaObject.n_og_title,
              description: metaObject.n_og_description,
              url: metaObject.n_og_url,
              images: [
                {
                  url: metaObject.n_og_image,
                  alt: 'PhirLo ',
                },
              ],
              site_name: 'PhirLo Admin Dashboard',
            }}
            twitter={{
              handle: '@phirlo',
              cardType: 'summary_large_image',
            }}
            additionalLinkTags={[
              {
                rel: 'icon',
                href: '/favicon/favicon.png',
              },
              {
                rel: 'manifest',
                href: '/favicon/site.webmanifest',
              },
            ]}
          />
        </>
      ) : (
        <>
          <NextSeo
            title={seoTitle}
            description={seoDescription}
            openGraph={{
              title: seoTitle,
              description: seoDescription,
              images: [
                {
                  url: 'https://staging.phirlo.in/logos/phirlo.png',
                  alt: 'PhirLo ',
                },
              ],
              site_name: 'PhirLo',
            }}
            additionalLinkTags={[
              {
                rel: 'icon',
                href: '/favicon/favicon.png',
              },
              {
                rel: 'manifest',
                href: '/favicon/site.webmanifest',
              },
            ]}
          />
        </>
      )}
    </>
  )
}

export default BaseSeo