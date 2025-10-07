import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export async function createDefaultAdmin() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return existingAdmin;
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create default admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@portfolio.com',
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      }
    });

    console.log('Default admin user created:', {
      email: admin.email,
      username: admin.username,
      role: admin.role,
    });

    return admin;
  } catch (error) {
    console.error('Error creating default admin:', error);
    throw error;
  }
}

// Function to seed initial blog data
export async function seedInitialBlogs() {
  try {
    const existingBlogs = await prisma.blog.count();

    if (existingBlogs > 0) {
      console.log('Blogs already exist, skipping seed');
      return;
    }

    // Import existing blog data and migrate it
    const BlogData = await import('../assets/jsonData/blog/BlogData.json');

    for (const blog of BlogData.default) {
      const slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      await prisma.blog.create({
        data: {
          title: blog.title,
          slug,
          excerpt: blog.text || 'No excerpt available.',
          content: `# ${blog.title}\n\n${blog.text}\n\nThis is an expanded version of the blog post with more detailed content.`,
          author: blog.author,
          thumbnail: blog.thumb,
          featuredImage: blog.thumbFull || blog.thumb,
          tags: JSON.stringify(['Web Development', 'Programming', 'Technology']),
          category: 'Technology',
          readTime: Math.ceil((blog.text?.split(' ').length || 100) / 200),
          isPublished: true,
          isDraft: false,
          seoTitle: blog.title,
          seoDescription: blog.text?.substring(0, 160) || 'Read this blog post.',
          publishedAt: new Date(blog.date),
        }
      });
    }

    console.log(`Seeded ${BlogData.default.length} blog posts`);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    throw error;
  }
}

// Main seed function
export async function runSeed() {
  try {
    console.log('🌱 Seeding database...');

    await createDefaultAdmin();
    await seedInitialBlogs();

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  runSeed();
}