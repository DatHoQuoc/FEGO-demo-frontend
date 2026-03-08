import styles from './staff.module.css'
import './staff.global.css'

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.staffRoot}>
      {children}
    </div>
  )
}