const description =
  'Witamy w naszym sklepie z akcesoriami treningowymi, gdzie pasja do fitnessu łączy się z modą! Oferujemy szeroki wybór odzieży sportowej, w tym t-shirty i bluzy, które zapewnią Ci wygodę podczas treningu. Nasze ręczniki i akcesoria są zaprojektowane z myślą o Twojej wydajności i stylu, aby każda sesja treningowa była przyjemnością.\n' +
    '\n' +
    'Dodatkowo, na naszym blogu znajdziesz inspirujące artykuły dotyczące treningów, zdrowego stylu życia oraz porady, które pomogą Ci osiągnąć Twoje cele fitnessowe. Dołącz do naszej społeczności i zainspiruj się do działania!.'
const title = 'BeBrave | sklep z akcesoriami treningowymi'
const url = 'https://commerce.withheadlesscms.com'

const seo = {
  title,
  titleTemplate: '%s | BeBrave',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
}

export { seo as defaultSeo, url as defaultUrl }
