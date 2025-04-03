import { useQuery } from "@tanstack/react-query";
import useToken from "@hooks/useToken";

const fetchUser = async (token: string | undefined) => {
  if (!token) {
    throw new Error('empty jwt token');
  }

  const res = await fetch(
    '/api/v3/users',
    {
      method: "GET",
      credentials: "include",
      headers: {
        'X-user-token': token,
      },
    },
  );
  const responseJson = await res.json();
  return {
    ...(responseJson.data),
    jwt: token,
    isloggedIn: true,
  };
};

function useUser() {
  const { isError, isPending, data } = useToken();
  const jwtToken = isError ? '' : data;
  const userQuery = useQuery({
    queryKey: ['fetch_user_data'],
    queryFn: () => fetchUser(jwtToken),
    placeholderData: {
      isloggedIn: false,
    },
    refetchOnWindowFocus: false,
    enabled: !isPending,
  });

  return userQuery;
}

export default useUser;
