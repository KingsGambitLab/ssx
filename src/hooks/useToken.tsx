import { useQuery } from "@tanstack/react-query";
import { generateJwt } from '@modules/common/apis';

const fetchJwt = async () => {
  const token = await generateJwt();

  if (token) {
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
