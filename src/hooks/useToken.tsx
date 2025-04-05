import { useQuery } from "@tanstack/react-query";

const fetchJwt = async () => {
  const res = await fetch('/generate-jwt', {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/plain",
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const token = await res.text();
  if (res.ok) {
    return token;
  } else {
    throw new Error('JWT token not found')
  }
};

function useToken() {
  return useQuery({
    queryKey: ['user_token'],
    queryFn: fetchJwt,
    placeholderData: '',
    refetchOnWindowFocus: false,
  });
}

export default useToken;
