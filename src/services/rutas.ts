import { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export type AppRoute = {
    id: string;
    label: string;
    href: string;
    icon?: IconName;
    navbar?: boolean;
    playlistNavbar?: boolean;
    children?: AppRoute[];
};

export const ROUTES: AppRoute[] = [
    {
        id: 'explore',
        label: 'Explore',
        href: '/explore',
        icon: 'search',
        navbar: true,
        children: [
            {
                id: 'albums',
                label: 'Albums',
                href: '/explore/albums',
                icon: 'albums',
                children: [
                    {
                        id: 'album-genres',
                        label: 'Album Genres',
                        href: '/explore/albums/genre/[genre]',
                        icon: 'library-sharp',
                    },
                    {
                        id: 'album-detail',
                        label: 'Album Detail',
                        href: '/explore/albums/[id]',
                        icon: 'disc',
                    },
                ],
            },

            {
                id: 'songs',
                label: 'Songs',
                href: '/explore/songs',
                icon: 'musical-notes',
                children: [
                    {
                        id: 'song-genres',
                        label: 'Song Genres',
                        href: '/explore/songs/genre/[genre]',
                        icon: 'radio',
                    },
                    {
                        id: 'song-detail',
                        label: 'Song Detail',
                        href: '/explore/songs/[id]',
                        icon: 'play',
                    },
                ],
            },

            {
                id: 'artists',
                label: 'Artists',
                href: '/explore/artists',
                icon: 'people',
                children: [
                    {
                        id: 'artist-genres',
                        label: 'Artist Genres',
                        href: '/explore/artists/genre/[genre]',
                        icon: 'color-palette',
                    },
                    {
                        id: 'artist-detail',
                        label: 'Artist Detail',
                        href: '/explore/artists/[id]',
                        icon: 'person',
                    },
                ],
            },
        ],
    },

    {
        id: 'lists',
        label: 'Lists',
        href: '/lists',
        icon: 'list',
        navbar: true,
        children: [
            {
                id: 'list-detail',
                label: 'List Detail',
                href: '/lists/[id]',
                icon: 'reorder-four',
            },
        ],
    },

    {
        id: 'playlist',
        label: 'Playlist',
        href: '/playlist',
        icon: 'play',
        navbar: true,

        children: [
            {
                id: 'playlist-queue',
                label: 'Queue',
                href: '/playlist/queue',
                icon: 'menu',
                playlistNavbar: true,
            },

            {
                id: 'playlist-current',
                label: 'Current',
                href: '/playlist/current',
                icon: 'musical-note',
                playlistNavbar: true,
            },

            {
                id: 'playlist-settings',
                label: 'Settings',
                href: '/playlist/settings',
                icon: 'settings',
                playlistNavbar: true,
            },
        ],
    },

    {
        id: 'local',
        label: 'Local',
        href: '/local',
        icon: 'folder',
        navbar: true,
    },

    {
        id: 'system',
        label: 'System',
        href: '/system',
        icon: 'settings',
        navbar: true,
    },
];

export const routesBuilder = {
    album: (id: string | number) =>
        `/explore/albums/${id}`,

    song: (id: string | number) =>
        `/explore/songs/${id}`,

    artist: (id: string | number) =>
        `/explore/artists/${id}`,

    list: (id: string | number) =>
        `/lists/${id}`,

    albumGenre: (genre: string) =>
        `/explore/albums/genre/${genre}`,
};

export const playlistRoute = ROUTES.find(
    (route) => route.id === 'playlist'
);

export const PLAYLIST_NAVBAR_ROUTES =
    playlistRoute?.children?.filter(
        (route) => route.playlistNavbar
    ) ?? [];