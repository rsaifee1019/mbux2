"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuth0Users = async () => {
      try {
        // Step 1: Get the access token from Auth0
        const options = {
          method: 'POST',
          url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
            audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
          }),
        };

        const tokenResponse = await axios.request(options);
        const { access_token } = tokenResponse.data;

        // Step 2: Fetch users from Auth0 Management API
        const usersOptions = {
          method: 'GET',
          url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await axios.request(usersOptions);
        setUsers(response.data); // Set the users data
      } catch (error) {
        console.error('Error fetching Auth0 users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAuth0Users();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      
      <div className="grid gap-4">
        {users.map((user) => (
          <div 
            key={user.user_id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              {user.picture && (
                <img 
                  src={user.picture} 
                  alt={user.name || user.email}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h2 className="font-semibold">{user.name || 'No name'}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Last login: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}