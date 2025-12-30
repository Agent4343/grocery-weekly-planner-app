import { NextRequest, NextResponse } from 'next/server';
import {
  generateNewsletter,
  getNewsletters,
  getNewsletterById,
  deleteNewsletter,
  exportNewsletterAsText,
  exportNewsletterAsHTML,
} from '@/lib/newsletter-generator';
import { GenerateNewsletterRequest } from '@/lib/newsletter-types';

// POST - Generate a new newsletter
// This endpoint is designed for AI agents to trigger newsletter generation
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json() as GenerateNewsletterRequest;

    // Validate request
    if (body.frequency && !['daily', 'weekly'].includes(body.frequency)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid frequency. Must be "daily" or "weekly".',
        },
        { status: 400 }
      );
    }

    if (body.storeIds && !Array.isArray(body.storeIds)) {
      return NextResponse.json(
        {
          success: false,
          error: 'storeIds must be an array of store ID strings.',
        },
        { status: 400 }
      );
    }

    // Generate the newsletter
    const newsletter = await generateNewsletter({
      frequency: body.frequency || 'daily',
      storeIds: body.storeIds,
      customGreeting: body.customGreeting,
      customClosing: body.customClosing,
      focusCategories: body.focusCategories,
      includeRecipes: body.includeRecipes !== false,
      aiEnhancements: body.aiEnhancements || false,
    });

    const processingTimeMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      newsletter,
      generatedAt: new Date().toISOString(),
      processingTimeMs,
      message: `Newsletter generated successfully with ${newsletter.totalDealsCount} deals from ${newsletter.storesIncluded.length} stores.`,
    });
  } catch (error) {
    console.error('Newsletter generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate newsletter.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve newsletters
// Query params:
//   - id: Get specific newsletter by ID
//   - latest: Get the most recent newsletter (set to "true")
//   - limit: Limit number of newsletters returned (default 10)
//   - format: "json" (default), "text", or "html"
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const latest = searchParams.get('latest');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const format = searchParams.get('format') || 'json';

    // Get specific newsletter by ID
    if (id) {
      const newsletter = getNewsletterById(id);
      if (!newsletter) {
        return NextResponse.json(
          { success: false, error: 'Newsletter not found.' },
          { status: 404 }
        );
      }

      // Handle different export formats
      if (format === 'text') {
        const text = exportNewsletterAsText(newsletter);
        return new NextResponse(text, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': `attachment; filename="newsletter-${newsletter.id}.txt"`,
          },
        });
      }

      if (format === 'html') {
        const html = exportNewsletterAsHTML(newsletter);
        return new NextResponse(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
      }

      return NextResponse.json({ success: true, newsletter });
    }

    // Get latest newsletter
    if (latest === 'true') {
      const newsletters = getNewsletters();
      const latestNewsletter = newsletters.length > 0 ? newsletters[0] : null;

      if (!latestNewsletter) {
        return NextResponse.json({
          success: true,
          newsletter: null,
          message: 'No newsletters found. Generate one first.',
        });
      }

      // Handle different export formats
      if (format === 'text') {
        const text = exportNewsletterAsText(latestNewsletter);
        return new NextResponse(text, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      }

      if (format === 'html') {
        const html = exportNewsletterAsHTML(latestNewsletter);
        return new NextResponse(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
      }

      return NextResponse.json({ success: true, newsletter: latestNewsletter });
    }

    // Get list of newsletters
    const newsletters = getNewsletters();
    const limited = newsletters.slice(0, Math.min(limit, 30));

    return NextResponse.json({
      success: true,
      newsletters: limited,
      total: newsletters.length,
      limit,
    });
  } catch (error) {
    console.error('Newsletter retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve newsletters.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a newsletter
// Query param: id (required)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Newsletter ID is required.' },
        { status: 400 }
      );
    }

    const deleted = deleteNewsletter(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Newsletter not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error('Newsletter deletion error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete newsletter.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
