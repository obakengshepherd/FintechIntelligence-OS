import PostForm from '@/components/PostForm';

export const metadata = {
  title: 'New Intelligence Report',
};

export default function CreatePostPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>
      <PostForm mode="create" />
    </div>
  );
}
