import { ProblemContent } from "@/components/problem-content"

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProblemContent id={id} />
}
