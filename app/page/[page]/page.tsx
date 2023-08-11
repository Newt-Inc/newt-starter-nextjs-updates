import { ArticleCard } from '@/components/ArticleCard'
import { Cover } from '@/components/Cover'
import { Dropdown } from '@/components/Dropdown'
import { DropdownList } from '@/components/DropdownList'
import { Pagination } from '@/components/Pagination'
import { getApp, getArticles } from '@/lib/newt'
import styles from '@/styles/ArticleList.module.css'

type Props = {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10

  const { total } = await getArticles()
  const maxPage = Math.ceil(total / limit)
  const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

  return pages.map((page) => ({
    page: page.toString(),
  }))
}
export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { page: _page } = params
  const page = Number(_page) || 1

  const app = await getApp()

  const limit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10
  const { articles, total } = await getArticles({
    limit,
    skip: limit * (page - 1),
  })

  return (
    <main>
      {app.cover?.value && <Cover />}
      <div className={styles.Articles}>
        <Dropdown>
          <DropdownList />
        </Dropdown>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
        <Pagination total={total} current={page} basePath={'/page'} />
      </div>
    </main>
  )
}
