import Image from 'next/image'
import { notFound } from 'next/navigation'
import { htmlToText } from 'html-to-text'
import { formatDate } from '@/lib/date'
import { getArticles, getArticle } from '@/lib/newt'
import styles from '@/styles/Article.module.css'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const { articles } = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)

  const title = article?.meta?.title || article?.title
  const bodyDescription = htmlToText(article?.body || '', {
    selectors: [{ selector: 'img', format: 'skip' }],
  }).slice(0, 200)
  const description = article?.meta?.description || bodyDescription
  const ogImage = article?.meta?.ogImage?.src

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: ogImage,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)
  if (!article) {
    notFound()
  }

  return (
    <main className={styles.Container}>
      <article className={styles.Article}>
        <div className={styles.Article_Header}>
          <ul className={styles.Article_Tags}>
            {article.categories.map((category) => (
              <li
                key={category._id}
                style={{ background: category.colorCode }}
                className={styles.Article_Tag}
              >
                <span>{category.emoji.value}</span>
                <strong>{category.name}</strong>
              </li>
            ))}
          </ul>
          <h1 className={styles.Article_Title}>{article.title}</h1>
          <div className={styles.Article_Data}>
            <div className={styles.Article_Avatar}>
              {article.author.profileImage ? (
                <Image
                  src={article.author.profileImage.src}
                  alt=""
                  width="32"
                  height="32"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#CCCCCC"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className={styles.Article_AuthorName}>
              {article.author.fullName}
            </div>
            <time
              dateTime={article._sys.createdAt}
              className={styles.Article_Date}
            >
              {formatDate(article._sys.createdAt)}
            </time>
          </div>
        </div>
        <div
          className={styles.Article_Body}
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></div>
      </article>
    </main>
  )
}
