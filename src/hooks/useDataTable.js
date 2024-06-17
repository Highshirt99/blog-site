import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export const useDataTable = ({dataQueryFn, dataQueryKey, mutateDeleteFn, deleteDataMessage}) => {
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
  
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const {
      data,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryFn: dataQueryFn,
      queryKey: [dataQueryKey],
    });
  
    const { mutate: mutateDeletePost, isLoading: isLoadingDeleteData } =
      useMutation({
        mutationFn: mutateDeleteFn,
        onSuccess: () => {
          queryClient.invalidateQueries([dataQueryKey]);
          toast.success(deleteDataMessage);
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        },
      });
  
  
    const searchKeywordHandler = (e) => {
      const { value } = e.target;
      setSearchKeyword(value);
    };
  
    const submitSearchKeywordHandler = (e) => {
      e.preventDefault();
      setCurrentPage(1);
      refetch();
    };
  
    const deleteDataHandler = ({ slug, token }) => {
      mutateDeletePost({ slug, token });
    };

    return {
        userState,
        currentPage,
        setCurrentPage,
        isLoading,
        isFetching,
        data,
        searchKeyword,
        isLoadingDeleteData,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
    }
  
}