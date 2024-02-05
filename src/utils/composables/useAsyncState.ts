import { onMounted, ref, shallowRef } from "vue";

interface Options<DataType, Params extends any[]> {
    initialArgs?: Params;
    defaultErrorStatus?: boolean;
    defaultLoadingStatus?: boolean;
    immediate?: boolean;
    onError?: (error: unknown) => void;
    //если критануть ошибку, то сработает onError и все ключи ошибок выставятся в тру
    onSuccess?: (data: DataType) => void;
}

export default function useAsyncState<DataType, Params extends any[] = []>(
    request: (...args: Params) => Promise<DataType>,
    {
        initialArgs = [] as any,
        defaultErrorStatus = false,
        defaultLoadingStatus = false,
        immediate = false,
        onError = () => {
            return;
        },
        onSuccess = () => {
            return;
        },
    }: Options<DataType, Params>
) {
    const isError = ref<boolean>(defaultErrorStatus);
    const error = ref<string>();
    const isLoading = ref<boolean>(defaultLoadingStatus);
    const data = shallowRef<DataType | undefined>(undefined);
    onMounted(() => {
        if (!immediate) return false;
        executeRequest(...initialArgs);
    });
    function executeRequest(...args: Params) {
        isLoading.value = true;
        isError.value = false;
        request(...args)
            .then((value) => {
                if (
                    typeof value === "object" &&
                    data.value == value &&
                    !Array.isArray(value) &&
                    value !== null
                ) {
                    data.value = { ...value };
                } else {
                    data.value = value;
                }
                onSuccess(data.value);
            })
            .catch((err) => {
                isError.value = true;
                error.value = err.toString
                    ? err.toString()
                    : "Произошла ошибка";
                onError(err);
            })
            .finally(() => {
                isLoading.value = false;
            });
    }
    return {
        isError,
        isLoading,
        error,
        data,
        executeRequest,
    };
}
