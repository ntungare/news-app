import path from 'path';

import { getHtml, renderFile } from '../utils/render';

import type { RequestHandler } from 'express';
import type { AppLocals } from '../../server/server';
import type { HomeRenderState } from '../../pages/home/Home.client';

export type Handler = RequestHandler<
    unknown,
    string,
    unknown,
    {
        tag?: string;
    },
    AppLocals
>;

export const makeHomeController = (): Handler =>
    async function HomeController(request, response) {
        const activeTagId = request.query.tag ?? 'latest';

        const state: HomeRenderState = {
            navBarProps: {
                title: 'DailyNews',
                navItems: [
                    {
                        id: 'home',
                        name: 'Home',
                        href: '/',
                    },
                    {
                        id: 'world',
                        name: 'World',
                        href: '/world',
                    },
                    {
                        id: 'politics',
                        name: 'Politics',
                        href: '/politics',
                    },
                    {
                        id: 'tech',
                        name: 'Tech',
                        href: '/tech',
                    },
                    {
                        id: 'sports',
                        name: 'Sports',
                        href: '/sports',
                    },
                ],
            },
            categoryTagsProps: {
                activeTagId: activeTagId,
                tags: [
                    {
                        id: 'latest',
                        name: 'Latest',
                    },
                    {
                        id: 'trending',
                        name: 'Trending',
                    },
                    {
                        id: 'top-rated',
                        name: 'Top Rated',
                    },
                    {
                        id: 'local',
                        name: 'Local',
                    },
                    {
                        id: 'business',
                        name: 'Business',
                    },
                ],
            },
            data: {
                mainArticle: {
                    title: 'Global Summit Reaches Historic Agreement on Climate Action',
                    description:
                        'World leaders have unanimously agreed to ambitious new targets for carbon reduction, marking a turning point in the fight against climate change. The agreement comes after weeks of intense negotiations, promising a greener future for generations to come.',
                    image: 'https://images.unsplash.com/photo-1621274790572-7c32596bc67f?auto=format&fit=crop&q=80&w=2000',
                    category: 'World',
                },
                articles: [
                    {
                        title: 'Tech Giant Unveils Revolutionary AI Assistant',
                        description:
                            'The new AI model promises to transform how we interact with our devices, offering real-time translation and advanced problem-solving capabilities.',
                        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                        category: 'Tech',
                    },
                    {
                        title: 'Championship Finals: Underdog Team Takes the Trophy',
                        description:
                            "In a stunning upset, the city's beloved underdog team defeated the defending champions in a match that will be remembered for decades.",
                        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
                        category: 'Sports',
                    },
                    {
                        title: 'New Space Telescope Sends Back Breath-taking Images',
                        description:
                            "NASA's latest observatory has captured the most detailed images of distant galaxies ever seen, shedding light on the early universe.",
                        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
                        category: 'Science',
                    },
                    {
                        title: 'Global Markets Rally Amid Positive Economic Data',
                        description:
                            'Stock markets around the world saw significant gains today as new reports indicate a faster-than-expected economic recovery.',
                        image: 'https://images.unsplash.com/photo-1611974765270-ca1258822947?auto=format&fit=crop&q=80&w=800',
                        category: 'Business',
                    },
                ],
                trending: [
                    {
                        badge: '🔥 Breaking',
                        title: 'Volcano Eruption Forces Evacuation',
                        description: 'Thousands flee as dormant volcano wakes up.',
                    },
                    {
                        badge: '📌 Politics',
                        title: 'Senate Passes New Infrastructure Bill',
                        description: 'Major funding approved for nationwide projects.',
                    },
                    {
                        badge: '⚡ Viral',
                        title: 'Mystery Monolith Appears in Desert',
                        description: 'Locals baffled by strange metallic structure.',
                    },
                ],
            },
        };
        const { serverAssetPath, queryClient, manifest } = response.locals;

        const rootHtml = await renderFile(
            path.join(serverAssetPath, 'home', 'Home.server.mjs'),
            queryClient,
            state
        );

        response.status(200).send(
            getHtml(
                { rootHtml, state },
                {
                    clientFileName: 'src/pages/home/Home.client.tsx',
                    manifest,
                }
            )
        );
    };
