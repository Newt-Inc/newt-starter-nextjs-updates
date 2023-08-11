import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/ArticleCard'
import { Cover } from '@/components/Cover'
import { Dropdown } from '@/components/Dropdown'
import { DropdownList } from '@/components/DropdownList'
import { Pagination } from '@/components/Pagination'
import { getApp, getArticles, getCategories, getCategory } from '@/lib/newt'
import styles from '@/styles/ArticleList.module.css'

type Props = {
  params: {
    slug: string
    page?: string[]
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10

  const params: { slug: string; page?: string[] }[] = []
  await categories.reduce(async (prevPromise, category) => {
    await prevPromise

    const { total } = await getArticles({
      categories: category._id,
    })
    const maxPage = Math.ceil(total / limit)
    const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

    params.push({
      slug: category.slug,
      page: undefined,
    })
    pages.forEach((page) => {
      params.push({
        slug: category.slug,
        page: [page.toString()],
      })
    })
  }, Promise.resolve())
  return params
}
export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { slug, page: _page } = params
  const page = Number(_page) || 1

  const app = await getApp()
  const category = await getCategory(slug)
  if (!category) {
    notFound()
  }

  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10
  const { articles, total } = await getArticles({
    categories: category._id,
    limit,
    skip: limit * (page - 1),
  })

  return (
    <main>
      {app.cover?.value && <Cover />}
      <div className={styles.Articles}>
        <Dropdown category={category}>
          <DropdownList />
        </Dropdown>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
        <Pagination
          total={total}
          current={page}
          basePath={`/categories/${slug}`}
        />
      </div>
    </main>
  )
}
