import { useContext } from 'react';
import { PlayerContext } from '../services/contexts/PlayerContext';

export default function usePlayList() {
    return useContext(PlayerContext);
}