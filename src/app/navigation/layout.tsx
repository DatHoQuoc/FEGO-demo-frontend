import styles from './navigation.module.css'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.navigationRoot}>
      {children}
    </div>
  )
}