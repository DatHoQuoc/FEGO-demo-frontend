import styles from './student.module.css'
import './student.global.css'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.studentRoot}>
      {children}
    </div>
  )
}