import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/assets/favicon.png' />
      <title>{title}</title>
      {/* Add hreflang links */}
      {/* <link rel="alternate" href="http://localhost:3000" hrefLang="x-default" />
      <link rel="alternate" href="http://localhost:3000" hrefLang="ar" />
      <link rel="alternate" href="http://example.com/en" hrefLang="en" /> */}
    </Head>
  )
}

Meta.defaultProps = {
  title: 'studyblood',
  keywords: ` مواقع وتطبيقات, تصميم متاجر الاكترونية`,
  description: 'أفضل شركة تصميم المواقع الإلكترونية و تطبيقات الجوال',
}

export default Meta;
