import { redirect } from 'next/navigation';

type Props = { params: Promise<{ locale: string; type: string }> };

/**
 * /result/[type] 만 접근 시 변형 번호(v) 없음 → 입력 유도 리다이렉트 (PROJECT_SPEC 11절).
 */
export default async function ResultTypeRedirectPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/input`);
}
