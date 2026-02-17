import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  return NextResponse.json({
    'x-vercel-ip-country': request.headers.get('x-vercel-ip-country'),
    'x-vercel-ip-country-region': request.headers.get('x-vercel-ip-country-region'),
    'x-vercel-ip-city': request.headers.get('x-vercel-ip-city'),
    'x-vercel-ip-latitude': request.headers.get('x-vercel-ip-latitude'),
    'x-vercel-ip-longitude': request.headers.get('x-vercel-ip-longitude'),
    'accept-language': request.headers.get('accept-language'),
    'cookie-NEXT_LOCALE': request.cookies.get('NEXT_LOCALE')?.value ?? null,
  });
}
