import { useQuery } from "@tanstack/react-query";
import { useUserApi } from '@modules/common/apis';

import useToken from "@hooks/useToken";

interface UserResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string;
    };
  };
}

interface User extends UserResponse {
  isloggedIn: boolean;
}

function useUser() {
  const { data: token } = useToken();
  const { getUserDetails } = useUserApi();

  const query = useQuery<User>({
    queryKey: ['fetch_user_data', token],
    queryFn: async () => {
      const response = await getUserDetails() as UserResponse;
      return {
        ...response,
        isloggedIn: true,
      };
    },
    enabled: !!token,
    placeholderData: {
      isloggedIn: false,
      data: {
        id: '',
        type: '',
        attributes: {
          id: 0,
          name: '',
          email: '',
          phoneNumber: '',
        }
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    hasFetched: query.isFetched
  };
}

export default useUser;
