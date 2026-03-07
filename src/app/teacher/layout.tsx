// app/teacher/layout.tsx
import styles from './teacher.module.css'
import './teacher.global.css'
export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.teacherRoot} teacher-section`}>
      {children}
    </div>
  )
}