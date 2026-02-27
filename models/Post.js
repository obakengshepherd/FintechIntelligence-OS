import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [280, 'Excerpt cannot exceed 280 characters'],
    },
    body: {
      type: String,
      required: [true, 'Body content is required'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Infrastructure Breakdown',
        'System Architecture',
        'Industry Intelligence',
        'Engineering Strategy',
        'Intelligence Tracking',
      ],
    },
    sector: {
      type: String,
      enum: ['Fintech', 'Insurtech', 'Wealthtech', 'Banktech', 'General'],
      default: 'General',
    },
    region: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: {
      type: Number, // minutes
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Auto-generate slug from title before saving
postSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
