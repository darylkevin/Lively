import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Health check
    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file', details: error.message }, { status: 500 });
  }
}