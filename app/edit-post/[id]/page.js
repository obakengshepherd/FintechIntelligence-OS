import PostForm from '@/components/PostForm';
import { notFound } from 'next/navigation';

async function getPost(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Edit Report',
};

export default async function EditPostPage({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
      <PostForm mode="edit" initialData={post} />
    </div>
  );
}
