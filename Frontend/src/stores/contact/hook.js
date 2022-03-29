import { useContext } from 'react';
//
import Context from './Context';

const useStore = () => {
    return useContext(Context);
}

export { useStore };