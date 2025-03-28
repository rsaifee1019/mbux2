export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
// Cache object to store the token
let tokenCache = null;

// Function to get a valid token
async function getManagementToken() {
  // Check if we have a cached token that's still valid (with 5 minute buffer)
  if (tokenCache && tokenCache.expiresAt > Date.now() + 300000) {
    return tokenCache.token;
  }

  const tokenUrl = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
  
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      scope: 'read:users',
      _: Date.now(),
    }),
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    console.error('Error fetching access token:', errorData);
    throw new Error('Failed to fetch access token');
  }

  const data = await tokenResponse.json();
  
  // Cache the new token with expiration
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000)
  };

  return data.access_token;
}

export async function GET() {
  try {
    const access_token = await getManagementToken();

    console.log('Attempting to fetch users from Auth0 Management API...');
    
    const usersResponse = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users?_=${Date.now()}`, 
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Cache-Control': 'no-store',
        },
      }
    );

    if (!usersResponse.ok) {
      const errorData = await usersResponse.json();
      console.error('Error fetching users:', errorData);
      return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    const users = await usersResponse.json();
    console.log('Users fetched successfully:', users);
    
    // Set headers to prevent caching in the response
    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
    
  } catch (error) {
    console.error('Error fetching Auth0 users:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch users' }, 
      { status: 500 }
    );
  }
}