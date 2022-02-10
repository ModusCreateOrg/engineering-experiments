import { FC } from 'react';

import { Grid } from '../../common/components/Grid';
import { Header } from '../../common/components/Header';
import { HeroCard } from '../../common/components/HeroCard';
import { PanelAddToFeed } from '../../common/components/PanelAddToFeed';
import { Post } from '../../common/components/Post';
import { PostCreator } from '../../common/components/PostCreator';
import { ScreenTemplate } from '../../common/components/ScreenTemplate';
import { Spacer } from '../../common/components/Spacer';

import { useRouter } from '../../common/hooks/useRouter';
import { POSTS } from './mock';

export const HomeScreen: FC = () => {
  const { navigate } = useRouter();

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
