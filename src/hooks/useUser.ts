import { useQuery } from "@tanstack/react-query";
import { useUserApi } from '@modules/common/apis';

interface UserResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      name: string;
      email: string;
      // ... other attributes
    };
  };
}

interface User extends UserResponse {
  isloggedIn: boolean;
}

function useUser() {
  const { getUserDetails } = useUserApi();
  
  return useQuery<User>({
    queryKey: ['fetch_user_data'],
    queryFn: async () => {
      const response = await getUserDetails() as UserResponse;
      return {
        ...response,
        isloggedIn: true,
      };
    },
    placeholderData: {
      isloggedIn: false,
      data: {
        id: '',
        type: '',
        attributes: {
          id: 0,
          name: '',
          email: '',
        }
      }
    },
    refetchOnWindowFocus: false,
  });
}

export default useUser;
