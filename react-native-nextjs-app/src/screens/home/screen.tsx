import { FC } from 'react';
import dynamic from 'next/dynamic';

import { Grid } from '../../common/components/Grid';
import { HeroCard } from '../../common/components/HeroCard';
import { PanelAddToFeed } from '../../common/components/PanelAddToFeed';
import { PostCreator } from '../../common/components/PostCreator';
import { ScreenTemplate } from '../../common/components/ScreenTemplate';
import { Spacer } from '../../common/components/Spacer';

import { POSTS } from './mock';

const Post = dynamic(() => import('../../common/components/Post'), { ssr: false });

export const HomeScreen: FC = () => {

  return (
    <ScreenTemplate noPadding>
      <Spacer height={24} />
      <Grid>
        <Grid.Col>
          <HeroCard />
          <Grid.Mobile>
            <Spacer height={12} />
            <PostCreator />
            <Spacer height={12} />
            {POSTS.map((p, i) => <Post key={i} {...p} />)}
          </Grid.Mobile>
        </Grid.Col>
        <Grid.Col desktopOnly flex={2.5}>
          <PostCreator />
          <Spacer height={12} />
          {POSTS.map((p, i) => <Post key={i} {...p} />)}
        </Grid.Col>
        <Grid.Col desktopOnly flex={1.5}>
          <PanelAddToFeed />
        </Grid.Col>
      </Grid>
    </ScreenTemplate>
  );
};
