export async function GET() {
    try {
  
      // Construct the token URL
      const tokenUrl = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
   
  
      // Get the access token from Auth0
      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        }),
      });
  
      // Check if the token response is OK
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Error fetching access token:', errorData);
        return Response.json({ error: 'Failed to fetch access token' }, { status: 500 });
      }
  
      const { access_token } = await tokenResponse.json();
      console.log('Access token fetched successfully:', access_token);
  
      console.log('Attempting to fetch users from Auth0 Management API...');
      // Fetch users from Auth0 Management API
      const usersResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      // Check if the users response is OK
      if (!usersResponse.ok) {
        const errorData = await usersResponse.json();
        console.error('Error fetching users:', errorData);
        return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
      }
  
      const users = await usersResponse.json();
      console.log('Users fetched successfully:', users);
      return Response.json(users);
    } catch (error) {
      console.error('Error fetching Auth0 users:', error);
      return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
  }