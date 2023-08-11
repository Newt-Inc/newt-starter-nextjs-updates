import { ArticleCard } from '@/components/ArticleCard'
import { Cover } from '@/components/Cover'
import { Dropdown } from '@/components/Dropdown'
import { DropdownList } from '@/components/DropdownList'
import { Pagination } from '@/components/Pagination'
import { getApp, getArticles } from '@/lib/newt'
import styles from '@/styles/ArticleList.module.css'

export default async function Page() {
  const app = await getApp()
  const { articles, total } = await getArticles({
    limit: Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10,
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
        <Pagination total={total} current={1} basePath={'/page'} />
      </div>
    </main>
  )
}
