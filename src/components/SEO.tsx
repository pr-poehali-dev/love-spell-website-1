import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export default function SEO({
  title = "Раиса Ильинская - Потомственная Ворожея | Приворот и Любовная Магия",
  description = "Опытная потомственная ворожея Раиса Ильинская. Приворот на любовь, возврат мужа, снятие порчи. Работаю только белой магией. Результат гарантирован. ⭐ 4.9/5",
  keywords = "приворот, ворожея, любовная магия, возврат мужа, снятие порчи, белая магия, гадание, экстрасенс, потомственная ведунья",
  image = "/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg",
  url = "https://poehali.dev",
  type = "website",
  structuredData
}: SEOProps) {
  const canonicalUrl = url.startsWith('http') ? url : `https://poehali.dev${url}`;
  
  return (
    <Helmet>
      {/* Базовые meta теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `https://poehali.dev${image}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Раиса Ильинская - Потомственная Ворожея" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `https://poehali.dev${image}`} />
      
      {/* Дополнительные meta теги */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Раиса Ильинская" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="ru" />
      <meta name="theme-color" content="#8B5CF6" />
      
      {/* Структурированные данные */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}