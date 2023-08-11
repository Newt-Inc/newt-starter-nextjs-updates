import Link from 'next/link'
import { getCategories } from '@/lib/newt'
import styles from '@/styles/Dropdown.module.css'

export async function DropdownList() {
  const categories = await getCategories()
  const categoriesWithAll = [
    {
      _id: 'all',
      name: 'All articles',
      slug: '',
    },
    ...categories,
  ]

  return (
    <div className={styles.Dropdown_List}>
      {categoriesWithAll.map((category) => (
        <Link
          className={styles.Dropdown_Item}
          href={category.slug ? `/categories/${category.slug}` : '/'}
          key={category._id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
