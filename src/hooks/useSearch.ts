/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import logger from "../utils/js_utils/logger";
import Storage from "../utils/js_utils/storage";

function useSearch<T>(
    initSearch?: any,
    option?: {
        is_storage_cache_key?: string,
        callback: (key: string | T, v: any) => void
    }
): [T, (key: string | T, v: any) => void] {
    const [search, _setSearch] = useState<T>(initSearch)

    const setSearch = useCallback((key: string | T, v?: any,) => {
        if (typeof key === 'object') {
            _setSearch(key);
        } else {
            const c = JSON.parse(JSON.stringify(search || {}));
            c[key] = v;
            _setSearch(c)
            option?.callback && option.callback(key, v);
            if (option?.is_storage_cache_key) {
                Storage.setStorageSync(option.is_storage_cache_key, c)
            }
        }

    }, [search, option])
    return [search, setSearch]
}

export default useSearch;