// app/api/post/[id]/route.js


import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Post from '@/model/Post';

export async function GET(request, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
